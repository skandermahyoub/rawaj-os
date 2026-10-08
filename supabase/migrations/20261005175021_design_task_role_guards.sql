create or replace function private.guard_designer_design_task_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_role text;
  v_uid uuid := (select auth.uid());
begin
  select p.role
    into v_role
  from public.profiles p
  where p.id = v_uid
    and p.is_active = true;

  if v_role is distinct from 'designer' then
    return new;
  end if;

  if old.designer_id is distinct from v_uid then
    raise exception 'Designer may update only tasks assigned to their account';
  end if;

  if new.designer_id is distinct from old.designer_id
     or new.designer_name is distinct from old.designer_name
     or new.title_ar is distinct from old.title_ar
     or new.client_name is distinct from old.client_name
     or new.client_phone is distinct from old.client_phone
     or new.quote_id is distinct from old.quote_id
     or new.service_id is distinct from old.service_id
     or new.department_id is distinct from old.department_id
     or new.deadline is distinct from old.deadline
     or new.priority is distinct from old.priority
     or new.description_ar is distinct from old.description_ar
     or new.dimensions_notes is distinct from old.dimensions_notes
     or new.required_format is distinct from old.required_format
     or new.brief_file_url is distinct from old.brief_file_url
     or new.created_at is distinct from old.created_at
  then
    raise exception 'Designer cannot edit administrative task fields';
  end if;

  if new.status is distinct from old.status then
    if not (
      (old.status = 'assigned' and new.status in ('in_progress','proof_submitted'))
      or (old.status = 'in_progress' and new.status = 'proof_submitted')
      or (old.status = 'feedback_requested' and new.status in ('in_progress','proof_submitted'))
    ) then
      raise exception 'Designer cannot perform this workflow transition';
    end if;
  end if;

  if jsonb_typeof(new.proof_versions) is distinct from 'array'
     or jsonb_array_length(new.proof_versions) < jsonb_array_length(old.proof_versions)
  then
    raise exception 'Designer cannot remove proof history';
  end if;

  if exists (
    select 1
    from jsonb_array_elements(old.proof_versions) with ordinality as old_proof(value, ord)
    where (new.proof_versions -> ((old_proof.ord - 1)::int)) is distinct from old_proof.value
  ) then
    raise exception 'Designer cannot rewrite proof history';
  end if;

  if jsonb_typeof(new.comments) is distinct from 'array'
     or jsonb_array_length(new.comments) < jsonb_array_length(old.comments)
  then
    raise exception 'Designer cannot remove comment history';
  end if;

  if exists (
    select 1
    from jsonb_array_elements(old.comments) with ordinality as old_comment(value, ord)
    where (new.comments -> ((old_comment.ord - 1)::int)) is distinct from old_comment.value
  ) then
    raise exception 'Designer cannot rewrite comment history';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_guard_designer_design_task_update on public.design_tasks;

create trigger trg_guard_designer_design_task_update
before update on public.design_tasks
for each row
execute function private.guard_designer_design_task_update();

drop policy if exists rawaj_media_staff_insert on storage.objects;
drop policy if exists rawaj_media_staff_update on storage.objects;
drop policy if exists rawaj_media_staff_delete on storage.objects;

create policy rawaj_media_staff_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'rawaj-media'
  and (
    private.has_any_role(array['owner','admin','editor'])
    or (
      name like 'design-proofs/%'
      and private.has_any_role(array['sales'])
    )
    or (
      name like 'design-proofs/%'
      and private.has_any_role(array['designer'])
      and exists (
        select 1
        from public.design_tasks t
        where t.id = split_part(storage.objects.name, '/', 2)
          and t.designer_id = (select auth.uid())
      )
    )
  )
);

create policy rawaj_media_staff_update
on storage.objects
for update
to authenticated
using (
  bucket_id = 'rawaj-media'
  and private.has_any_role(array['owner','admin','editor'])
)
with check (
  bucket_id = 'rawaj-media'
  and private.has_any_role(array['owner','admin','editor'])
);

create policy rawaj_media_staff_delete
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'rawaj-media'
  and private.has_any_role(array['owner','admin','editor'])
);
