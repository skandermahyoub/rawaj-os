-- Consolidate production-centric taxonomy into customer-facing service paths.
insert into public.departments
(id,name_ar,name_en,slug,icon,description_ar,hero_image,sort_order,is_active)
values
('dept-specialty','الليزر والأكريليك والطباعة التخصصية','Laser, Acrylic & Specialty Printing','specialty-production','Sparkles',
 'قص وحفر الليزر والروتر، الدروع والمجسمات، والطباعة المباشرة UV على الأكريليك والخشب والمعادن والأسطح الخاصة.',
 '/images/crystal_trophy_1790806902354.jpg',7,true)
on conflict (id) do update set
 name_ar=excluded.name_ar,name_en=excluded.name_en,slug=excluded.slug,icon=excluded.icon,
 description_ar=excluded.description_ar,hero_image=excluded.hero_image,sort_order=excluded.sort_order,is_active=true;

update public.departments set
  name_ar='التغليف والعبوات والملصقات',
  name_en='Packaging, Labels & Pouches',
  description_ar='العلب والأكياس والتغليف المرن وملصقات المنتجات والليبل؛ من العبوة الأولية إلى التغليف الجاهز للسوق.',
  sort_order=3
where id='dept-packaging';

update public.departments set
  name_ar='اللوحات والواجهات والإعلانات الخارجية',
  name_en='Facades, Signage & Outdoor Branding',
  description_ar='واجهات المحلات، الكلادينج، الحروف واللوحات المضيئة، النيون، البنرات، تجليد المركبات والإرشاد الداخلي والخارجي.',
  sort_order=4
where id='dept-facades';

update public.departments set
  name_ar='الملابس واليونيفورم والتطريز',
  name_en='Apparel, Uniforms & Embroidery',
  description_ar='طباعة الملابس والزي الموحد والتطريز الآلي والشارات والكابات لموظفي الشركات والفعاليات.',
  sort_order=5
where id='dept-apparel';

update public.departments set sort_order=1 where id='dept-design';
update public.departments set sort_order=2 where id='dept-paper';
update public.departments set sort_order=6 where id='dept-promotions';
update public.departments set sort_order=8 where id='dept-events';
update public.departments set sort_order=9 where id='dept-hospitality';
update public.departments set sort_order=10 where id='dept-security';
update public.departments set
  name_ar='التوريد والمشاريع الخاصة',
  name_en='Special Sourcing & Large Projects',
  description_ar='طلبات التصنيع والتوريد الخاصة والكميات الكبيرة والمشاريع التي تتطلب مصادر إنتاج خارجية أو تجهيزاً غير نمطي.',
  sort_order=11
where id='dept-sourcing';

update public.categories set department_id='dept-packaging'
where department_id in ('dept-labels','dept-flexible-packaging');
update public.categories set department_id='dept-facades'
where department_id in ('dept-large-format','dept-signage','dept-neon-decor');
update public.categories set department_id='dept-apparel'
where department_id='dept-embroidery';
update public.categories set department_id='dept-specialty'
where department_id in ('dept-uv','dept-laser');

update public.services set department_id='dept-packaging'
where department_id in ('dept-labels','dept-flexible-packaging');
update public.services set department_id='dept-facades'
where department_id in ('dept-large-format','dept-signage','dept-neon-decor');
update public.services set department_id='dept-apparel'
where department_id='dept-embroidery';
update public.services set department_id='dept-specialty'
where department_id in ('dept-uv','dept-laser');

update public.departments set is_active=false
where id in (
  'dept-labels','dept-flexible-packaging','dept-large-format','dept-signage',
  'dept-embroidery','dept-uv','dept-laser','dept-neon-decor'
);
