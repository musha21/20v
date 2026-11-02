-- Harden function search_path and EXECUTE grants

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.is_admin() from public, anon;
revoke all on function public.is_approved_member() from public, anon;
revoke all on function public.bootstrap_admin(text) from public, anon;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_approved_member() to authenticated;
grant execute on function public.bootstrap_admin(text) to authenticated;

do $$
begin
  if exists (
    select 1 from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'rls_auto_enable'
  ) then
    execute 'revoke all on function public.rls_auto_enable() from public, anon, authenticated';
  end if;
end $$;
