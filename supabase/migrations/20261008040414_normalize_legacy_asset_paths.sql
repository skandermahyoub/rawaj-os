-- Normalize legacy Vite source asset paths to public asset paths.
-- This prevents production pages from referencing /src/assets/... URLs that only exist in source code.

update public.home_slides
set image_url = replace(image_url, '/src/assets/images/', '/images/'),
    updated_at = now()
where image_url like '/src/assets/images/%';

update public.media
set url = replace(url, '/src/assets/images/', '/images/')
where url like '/src/assets/images/%';
