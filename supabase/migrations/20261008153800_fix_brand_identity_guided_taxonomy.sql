-- Keep brand identity under the design taxonomy and present it as a guided customer need.
insert into public.categories
(id,department_id,name_ar,name_en,slug,description_ar,sort_order,is_active)
values
('cat-brand-identity','dept-design','الهوية البصرية والعلامة التجارية','Brand Identity & Visual Systems',
 'brand-identity','تصميم الهوية البصرية ونظامها التطبيقي وتجهيز ملفات الاستخدام والطباعة.',2,true)
on conflict (id) do update set
  department_id=excluded.department_id,name_ar=excluded.name_ar,name_en=excluded.name_en,
  slug=excluded.slug,description_ar=excluded.description_ar,sort_order=excluded.sort_order,is_active=true;

update public.services
set category_id='cat-brand-identity',
    name_ar='تصميم هوية بصرية وعلامة تجارية',
    name_en='Brand Identity & Visual System Design',
    slug='brand-identity-design',
    short_description_ar='من الشعار إلى الألوان والخطوط وتطبيقات الهوية؛ اختر مستوى الهوية الذي تحتاجه وما المواد التي تريد تجهيزها للاستخدام والطباعة.',
    full_description_ar='هذه الخدمة تساعدك على تحديد حجم مشروع الهوية قبل التواصل. يمكنك طلب شعار فقط، هوية أساسية، أو نظام بصري متكامل مع التطبيقات، ثم اختيار المواد التي تحتاجها مثل كروت العمل والمراسلات والقوالب والملفات الجاهزة للطباعة.',
    customer_goal_ar='أريد هوية لجهتي لكن لا أعرف هل أحتاج شعاراً فقط أم نظام هوية كامل وما التطبيقات التي يجب تجهيزها.',
    quantity_unit='مشروع',
    specification_groups='[
      {"id":"grp-brand-level","title_ar":"ما مستوى الهوية الذي تحتاجه؟","sort_order":1,"fields":[
        {"id":"brand-level","key":"brand_level","label_ar":"نطاق المشروع","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"logo","value":"logo_only","label_ar":"تصميم شعار فقط","description":"لمن لديه احتياج واضح ومحدود لشعار جديد."},
          {"id":"basic","value":"basic_identity","label_ar":"هوية أساسية","description":"شعار + ألوان + خطوط + قواعد استخدام مختصرة.","badge":"بداية متوازنة"},
          {"id":"full","value":"full_identity","label_ar":"هوية بصرية متكاملة","description":"نظام بصري كامل مع التطبيقات والقواعد وملف Brand Guide.","badge":"متكامل"}
        ]}
      ]},
      {"id":"grp-brand-apps","title_ar":"ما التطبيقات التي تريد تجهيزها؟","sort_order":2,"fields":[
        {"id":"brand-apps","key":"applications","label_ar":"التطبيقات","type":"multi_select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"cards","value":"business_cards","label_ar":"كروت أعمال"},
          {"id":"letterhead","value":"letterhead","label_ar":"ورق رسمي ومراسلات"},
          {"id":"envelopes","value":"envelopes","label_ar":"أظرف"},
          {"id":"social","value":"social_templates","label_ar":"قوالب سوشال ميديا"},
          {"id":"signage","value":"signage","label_ar":"تطبيقات لوحات وواجهة"},
          {"id":"packaging","value":"packaging","label_ar":"تطبيقات تغليف"},
          {"id":"presentation","value":"presentation","label_ar":"عرض تقديمي / ملف شركة"}
        ]}
      ]}
    ]'::jsonb,
    updated_at=now()
where id='srv-brand-identity-design';
