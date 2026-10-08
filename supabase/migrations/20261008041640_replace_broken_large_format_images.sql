-- Replace a broken legacy Unsplash source with stable bundled production assets.
-- Production migration version matches Supabase migration history.

update public.departments
set hero_image = '/images/vehicle_branding_wrap_1790811427153.jpg',
    updated_at = now()
where id = 'dept-large-format'
  and hero_image like 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675%';

update public.services
set hero_image = case
      when id = 'srv-portable-displays' then '/images/exhibition_booth_1790806891854.jpg'
      else '/images/vehicle_branding_wrap_1790811427153.jpg'
    end,
    updated_at = now()
where id in ('srv-outdoor-banners', 'srv-portable-displays')
  and hero_image like 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675%';
