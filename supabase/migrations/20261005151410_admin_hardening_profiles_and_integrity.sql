drop policy if exists profiles_select on public.profiles;

create policy profiles_select
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
  or private.has_any_role(array['owner','admin','editor','sales','designer'])
);

update public.industry_sectors
set package_ids = array_remove(package_ids, 'pkg-food-beverage'),
    updated_at = now()
where 'pkg-food-beverage' = any(package_ids);

update public.services
set related_package_ids = array_remove(related_package_ids, 'pkg-food-beverage'),
    updated_at = now()
where 'pkg-food-beverage' = any(related_package_ids);
