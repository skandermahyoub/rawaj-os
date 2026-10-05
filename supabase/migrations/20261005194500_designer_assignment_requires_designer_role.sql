drop policy if exists design_tasks_staff_read on public.design_tasks;
drop policy if exists design_tasks_staff_update on public.design_tasks;

create policy design_tasks_staff_read
on public.design_tasks
for select
to authenticated
using (
  private.has_any_role(array['owner','admin','sales'])
  or (
    private.has_any_role(array['designer'])
    and designer_id = (select auth.uid())
  )
);

create policy design_tasks_staff_update
on public.design_tasks
for update
to authenticated
using (
  private.has_any_role(array['owner','admin','sales'])
  or (
    private.has_any_role(array['designer'])
    and designer_id = (select auth.uid())
  )
)
with check (
  private.has_any_role(array['owner','admin','sales'])
  or (
    private.has_any_role(array['designer'])
    and designer_id = (select auth.uid())
  )
);
