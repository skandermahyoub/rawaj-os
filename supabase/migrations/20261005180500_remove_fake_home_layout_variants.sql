update public.settings s
set value = jsonb_set(
  s.value,
  '{configs}',
  (
    select jsonb_agg(
      case cfg->>'id'
        when 'slider' then jsonb_set(jsonb_set(cfg,'{layout_style}','"full_cinematic"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        when 'marquee' then jsonb_set(jsonb_set(cfg,'{layout_style}','"crimson_pulse"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        when 'calculator' then jsonb_set(jsonb_set(cfg,'{layout_style}','"interactive_card"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        when 'sector_packages' then jsonb_set(jsonb_set(cfg,'{layout_style}','"tabs_slider"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        when 'promo_banners' then jsonb_set(jsonb_set(cfg,'{layout_style}','"dynamic_grid"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        when 'about_us' then jsonb_set(jsonb_set(cfg,'{layout_style}','"executive_story"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        when 'portfolio_showcase' then jsonb_set(
          jsonb_set(cfg,'{layout_style}',to_jsonb(case when cfg->>'layout_style'='proud_showcase' then 'proud_showcase' else 'case_studies' end)),
          '{available_layouts}',
          jsonb_build_array((cfg->'available_layouts')->0,(cfg->'available_layouts')->1)
        )
        when 'testimonials' then jsonb_set(jsonb_set(cfg,'{layout_style}','"carousel_cards"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        when 'brands_partners' then jsonb_set(jsonb_set(cfg,'{layout_style}','"colored_ticker"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        when 'blog_hub' then jsonb_set(jsonb_set(cfg,'{layout_style}','"knowledge_highlights"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        when 'faq' then jsonb_set(jsonb_set(cfg,'{layout_style}','"interactive_accordion"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        when 'contact_us' then jsonb_set(jsonb_set(cfg,'{layout_style}','"full_channels_form"'::jsonb),'{available_layouts}',jsonb_build_array((cfg->'available_layouts')->0))
        else cfg
      end
      order by (cfg->>'sort_order')::int
    )
    from jsonb_array_elements(s.value->'configs') cfg
  ),
  true
),
updated_at = now()
where s.key='home_modules_order';
