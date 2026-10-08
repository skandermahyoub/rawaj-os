-- Replace a broken external portfolio image with a stable bundled production asset.

update public.portfolio
set images = jsonb_set(
      coalesce(images, '[]'::jsonb),
      '{0}',
      to_jsonb('/images/exhibition_booth_showcase_1790822553791.jpg'::text),
      true
    ),
    updated_at = now()
where id = 'proj-3'
  and coalesce(images->>0,'') like 'https://images.unsplash.com/photo-1554415707-9e49016a3e06%';
