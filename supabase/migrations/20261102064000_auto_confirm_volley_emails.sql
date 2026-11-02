-- Auto-confirm synthetic mobile auth emails so password login works without inbox access

create or replace function public.auto_confirm_volley_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email like '%@volley.local' then
    new.email_confirmed_at := coalesce(new.email_confirmed_at, now());
  end if;
  return new;
end;
$$;

revoke all on function public.auto_confirm_volley_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_auto_confirm on auth.users;
create trigger on_auth_user_auto_confirm
before insert on auth.users
for each row execute function public.auto_confirm_volley_user();
