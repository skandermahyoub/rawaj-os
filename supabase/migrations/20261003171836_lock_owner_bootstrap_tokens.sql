
drop policy if exists owner_bootstrap_deny_all on public.owner_bootstrap_tokens;
create policy owner_bootstrap_deny_all
on public.owner_bootstrap_tokens
for all
to anon, authenticated
using (false)
with check (false);
