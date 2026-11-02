-- Village Volleyball Ground — core schema, triggers, RLS
-- Applied via Supabase MCP as volleyball_core_schema

create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  mobile_number text not null,
  role text not null default 'PLAYER' check (role in ('ADMIN', 'PLAYER')),
  status text not null default 'PENDING' check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  created_at timestamptz not null default now(),
  constraint profiles_mobile_number_unique unique (mobile_number)
);

create index profiles_role_idx on public.profiles (role);
create index profiles_status_idx on public.profiles (status);

create table public.daily_collections (
  id uuid primary key default gen_random_uuid(),
  collection_date date not null,
  amount numeric(12, 2) not null check (amount >= 0),
  description text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint daily_collections_date_unique unique (collection_date)
);

create index daily_collections_date_idx on public.daily_collections (collection_date desc);

create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  purchase_name text not null,
  amount numeric(12, 2) not null check (amount >= 0),
  expense_date date not null,
  description text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index expenses_date_idx on public.expenses (expense_date desc);

create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  sponsor_name text not null,
  mobile_number text,
  amount numeric(12, 2) not null check (amount >= 0),
  sponsorship_date date not null,
  description text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index sponsors_date_idx on public.sponsors (sponsorship_date desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger daily_collections_set_updated_at
before update on public.daily_collections
for each row execute function public.set_updated_at();

create schema if not exists private;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'ADMIN'
      and status = 'APPROVED'
  );
$$;

create or replace function public.is_approved_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and status = 'APPROVED'
      and role in ('ADMIN', 'PLAYER')
  );
$$;

revoke all on function public.is_admin() from public;
revoke all on function public.is_approved_member() from public;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_approved_member() to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text;
  v_mobile text;
begin
  v_name := coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'Player');
  v_mobile := coalesce(nullif(trim(new.raw_user_meta_data ->> 'mobile_number'), ''), new.email);

  insert into public.profiles (id, full_name, mobile_number, role, status)
  values (new.id, v_name, v_mobile, 'PLAYER', 'PENDING')
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.bootstrap_admin(p_mobile_number text)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.profiles;
  v_mobile text := trim(p_mobile_number);
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  if exists (select 1 from public.profiles where role = 'ADMIN') then
    raise exception 'Admin already exists';
  end if;

  update public.profiles
  set role = 'ADMIN',
      status = 'APPROVED',
      mobile_number = coalesce(nullif(v_mobile, ''), mobile_number),
      full_name = coalesce(nullif(trim(full_name), ''), 'Admin')
  where id = auth.uid()
  returning * into v_profile;

  if v_profile.id is null then
    raise exception 'Profile not found for current user';
  end if;

  return v_profile;
end;
$$;

revoke all on function public.bootstrap_admin(text) from public;
grant execute on function public.bootstrap_admin(text) to authenticated;

alter table public.profiles enable row level security;
alter table public.daily_collections enable row level security;
alter table public.expenses enable row level security;
alter table public.sponsors enable row level security;

grant usage on schema public to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.daily_collections to authenticated;
grant select, insert, update, delete on public.expenses to authenticated;
grant select, insert, update, delete on public.sponsors to authenticated;

create policy "Users can read own profile"
  on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_admin());

create policy "Users can update own safe fields"
  on public.profiles for update to authenticated
  using (id = auth.uid())
  with check (
    id = auth.uid()
    and role = (select p.role from public.profiles p where p.id = auth.uid())
    and status = (select p.status from public.profiles p where p.id = auth.uid())
  );

create policy "Admins can update any profile"
  on public.profiles for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Approved members can read collections"
  on public.daily_collections for select to authenticated
  using (public.is_approved_member());

create policy "Admins manage collections insert"
  on public.daily_collections for insert to authenticated
  with check (public.is_admin());

create policy "Admins manage collections update"
  on public.daily_collections for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins manage collections delete"
  on public.daily_collections for delete to authenticated
  using (public.is_admin());

create policy "Approved members can read expenses"
  on public.expenses for select to authenticated
  using (public.is_approved_member());

create policy "Admins manage expenses insert"
  on public.expenses for insert to authenticated
  with check (public.is_admin());

create policy "Admins manage expenses update"
  on public.expenses for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins manage expenses delete"
  on public.expenses for delete to authenticated
  using (public.is_admin());

create policy "Approved members can read sponsors"
  on public.sponsors for select to authenticated
  using (public.is_approved_member());

create policy "Admins manage sponsors insert"
  on public.sponsors for insert to authenticated
  with check (public.is_admin());

create policy "Admins manage sponsors update"
  on public.sponsors for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins manage sponsors delete"
  on public.sponsors for delete to authenticated
  using (public.is_admin());
