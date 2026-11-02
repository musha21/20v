-- One-time opening balance held before the system started

create table public.ground_settings (
  id uuid primary key default gen_random_uuid(),
  opening_balance numeric(12, 2) not null default 0 check (opening_balance >= 0),
  opening_balance_note text,
  updated_by uuid references public.profiles (id) on delete set null,
  updated_at timestamptz not null default now()
);

insert into public.ground_settings (opening_balance, opening_balance_note)
values (0, 'Cash before system start');

create or replace function public.set_ground_settings_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger ground_settings_set_updated_at
before update on public.ground_settings
for each row execute function public.set_ground_settings_updated_at();

alter table public.ground_settings enable row level security;

grant select on public.ground_settings to authenticated;
grant insert, update on public.ground_settings to authenticated;

create policy "Approved members can read ground settings"
  on public.ground_settings for select to authenticated
  using (public.is_approved_member());

create policy "Admins can insert ground settings"
  on public.ground_settings for insert to authenticated
  with check (public.is_admin());

create policy "Admins can update ground settings"
  on public.ground_settings for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());
