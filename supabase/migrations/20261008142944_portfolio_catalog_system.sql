-- Upgrade portfolio into a managed visual catalog.
alter table public.portfolio
  add column if not exists category_ar text not null default 'أعمال متنوعة',
  add column if not exists work_type text not null default 'project',
  add column if not exists tags_ar jsonb not null default '[]'::jsonb;

update public.portfolio set category_ar = case id
  when 'portfolio-signage-facades' then 'الواجهات والحروف المضيئة'
  when 'portfolio-kiosks-pos' then 'الأكشاك ونقاط البيع'
  when 'portfolio-interior-branding' then 'الديكور والهوية الداخلية'
  when 'portfolio-sign-rehab' then 'اللوحات والصيانة'
  when 'portfolio-laser-awards' then 'الليزر والدروع'
  when 'portfolio-commercial-printing' then 'الطباعة التجارية'
  when 'portfolio-promotional-gifts' then 'الهدايا الدعائية'
  when 'portfolio-institutional-signage' then 'اللوحات والتوجيه'
  else coalesce(nullif(category_ar,''),'أعمال متنوعة')
end,
work_type = 'project',
tags_ar = case id
  when 'portfolio-signage-facades' then '["واجهات","حروف بارزة","كلادينج","إضاءة"]'::jsonb
  when 'portfolio-kiosks-pos' then '["أكشاك","نقاط بيع","هوية خارجية"]'::jsonb
  when 'portfolio-interior-branding' then '["هوية داخلية","استقبال","توجيه"]'::jsonb
  when 'portfolio-sign-rehab' then '["صيانة","تجديد","لوحات"]'::jsonb
  when 'portfolio-laser-awards' then '["ليزر","دروع","أكريليك","مجسمات"]'::jsonb
  when 'portfolio-commercial-printing' then '["طباعة","بروشورات","بطاقات","هوية"]'::jsonb
  when 'portfolio-promotional-gifts' then '["هدايا","دروع","تكريم"]'::jsonb
  when 'portfolio-institutional-signage' then '["لوحات","توجيه","مؤسسات"]'::jsonb
  else '[]'::jsonb
end;

alter table public.portfolio drop constraint if exists portfolio_work_type_check;
alter table public.portfolio
  add constraint portfolio_work_type_check check (work_type in ('project','gallery'));
