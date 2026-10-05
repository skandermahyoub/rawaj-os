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
      and private.has_any_role(array['sales','designer'])
    )
  )
);

create policy rawaj_media_staff_update
on storage.objects
for update
to authenticated
using (
  bucket_id = 'rawaj-media'
  and (
    private.has_any_role(array['owner','admin','editor'])
    or (
      name like 'design-proofs/%'
      and private.has_any_role(array['sales','designer'])
    )
  )
)
with check (
  bucket_id = 'rawaj-media'
  and (
    private.has_any_role(array['owner','admin','editor'])
    or (
      name like 'design-proofs/%'
      and private.has_any_role(array['sales','designer'])
    )
  )
);

create policy rawaj_media_staff_delete
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'rawaj-media'
  and (
    private.has_any_role(array['owner','admin','editor'])
    or (
      name like 'design-proofs/%'
      and private.has_any_role(array['sales','designer'])
    )
  )
);
