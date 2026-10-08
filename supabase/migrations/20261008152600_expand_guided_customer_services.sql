-- Continue converting technical products into customer-need guided services.

update public.services
set name_ar='طباعة وتطريز الملابس والزي الموحد',
    name_en='Custom Apparel, Uniform Printing & Embroidery',
    slug='custom-apparel-uniforms',
    short_description_ar='تيشيرتات، بولو، زي موظفين وكابات بطباعة أو تطريز أو مزيج بينهما. شاهد الفرق بين التقنيات واختر الشكل الأنسب لاستخدامك.',
    full_description_ar='ابدأ من القطعة التي تحتاجها ثم اختر أسلوب وضع الهوية عليها. لا تحتاج لمعرفة الفرق بين DTF والتطريز مسبقاً؛ الصفحة تشرح الشكل والاستخدام وتسمح لرواج بترشيح التقنية الأنسب حسب القماش والكمية والميزانية.',
    customer_goal_ar='أريد ملابس أو زياً موحداً يحمل هويتي، وأريد أن أعرف هل الأنسب طباعة أم تطريز أم كلاهما.',
    quantity_unit='قطعة',
    specification_groups='[
      {"id":"grp-apparel-item","title_ar":"ما القطعة التي تريدها؟","sort_order":1,"fields":[
        {"id":"apparel-item","key":"item_type","label_ar":"نوع القطعة","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"tshirt","value":"tshirt","label_ar":"تيشيرت","description":"للفعاليات والفرق والحملات والملابس اليومية.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/dtf/1791461281487-144a88d3-19a6-4e38-9f2e-78232bfda075-1000080180.webp"},
          {"id":"polo","value":"polo","label_ar":"بولو","description":"مظهر مؤسسي أنيق للموظفين والفرق."},
          {"id":"uniform","value":"uniform","label_ar":"زي موظفين أو عمل","description":"حل موحد للفرق التشغيلية والخدمية."},
          {"id":"cap","value":"cap","label_ar":"كاب / قبعة","description":"مناسب للتطريز والحملات والفرق."},
          {"id":"other","value":"other","label_ar":"قطعة أخرى","description":"اخترها ثم اكتب ما تحتاجه في الملاحظات."}
        ]}
      ]},
      {"id":"grp-apparel-branding","title_ar":"كيف تريد ظهور الشعار أو التصميم؟","description_ar":"اختر الشكل الذي يعجبك؛ رواج ستقترح التقنية المناسبة للخامة.","sort_order":2,"fields":[
        {"id":"branding-method","key":"branding_method","label_ar":"أسلوب التنفيذ","type":"multi_select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"print","value":"print","label_ar":"طباعة ملونة على القماش","description":"مناسبة للتصاميم متعددة الألوان والصور والتدرجات.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/dtf/1791461281487-144a88d3-19a6-4e38-9f2e-78232bfda075-1000080180.webp","badge":"مرن"},
          {"id":"embroidery","value":"embroidery","label_ar":"تطريز مباشر","description":"خيوط بارزة تعطي إحساساً مؤسسياً وفخماً وتتحمل الاستخدام.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/computerized-embroidery/1791461745732-dd05d3a4-5a81-4572-9f49-a04d6a8ecc4a-1000080189.webp","badge":"فاخر"},
          {"id":"mixed","value":"mixed","label_ar":"طباعة + تطريز","description":"دمج التقنيتين في نفس الزي حسب مواضع الشعار والتصميم."}
        ]},
        {"id":"logo-positions","key":"positions","label_ar":"أماكن وضع الهوية","type":"multi_select","required":false,"allow_rawaj_recommendation":true,"sort_order":2,"options":[
          {"id":"chest","value":"chest","label_ar":"الصدر"},
          {"id":"back","value":"back","label_ar":"الظهر"},
          {"id":"sleeve","value":"sleeve","label_ar":"الكم"},
          {"id":"cap-front","value":"cap_front","label_ar":"واجهة الكاب"}
        ]}
      ]}
    ]'::jsonb,
    updated_at=now()
where id='srv-dtf-apparel';

update public.services set catalog_role='component', updated_at=now()
where id='srv-computerized-embroidery';

update public.services
set name_ar='تجهيز معرض أو فعالية',
    name_en='Exhibition & Event Setup',
    slug='exhibition-event-setup',
    short_description_ar='من البوث والستاندات إلى الرول أب والأعلام وبطاقات الحضور؛ اجمع ما تحتاجه للفعالية في خدمة واحدة.',
    full_description_ar='اختر نوع الفعالية والعناصر التي تحتاجها، ثم دع رواج تنسقها ضمن هوية واحدة. يمكن طلب جناح كامل أو الاكتفاء بعناصر عرض متنقلة وبطاقات وشرائط تعريف.',
    customer_goal_ar='لدي معرض أو مؤتمر أو فعالية وأريد تجهيز المواد التي سأحتاجها دون أن أبحث عن كل قطعة كخدمة منفصلة.',
    quantity_unit='فعالية',
    specification_groups='[
      {"id":"grp-event-type","title_ar":"ما نوع الفعالية؟","sort_order":1,"fields":[
        {"id":"event-type","key":"event_type","label_ar":"نوع الحدث","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"exhibition","value":"exhibition","label_ar":"معرض تجاري"},
          {"id":"conference","value":"conference","label_ar":"مؤتمر أو ملتقى"},
          {"id":"launch","value":"launch","label_ar":"إطلاق منتج أو افتتاح"},
          {"id":"activation","value":"activation","label_ar":"حملة أو تفعيل ميداني"}
        ]}
      ]},
      {"id":"grp-event-elements","title_ar":"ما الذي تحتاجه في الموقع؟","sort_order":2,"fields":[
        {"id":"event-elements","key":"elements","label_ar":"عناصر التجهيز","type":"multi_select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"booth","value":"booth","label_ar":"بوث / جناح معرض","description":"تصميم وتنفيذ مساحة عرض متكاملة تحمل هوية العلامة.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/custom-exhibition-booths/1791462568939-93e0280f-62d8-4db7-9744-0f7db707a57c-1000080200.webp","badge":"مشروع متكامل"},
          {"id":"portable","value":"portable_displays","label_ar":"رول أب / Pop-up / أعلام","description":"حلول متنقلة سهلة النقل والتركيب.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/roll-ups-pop-ups-beach-flags/1791462521070-f9df849c-0984-48eb-90a7-5ec986172725-1000080201.webp"},
          {"id":"badges","value":"badges","label_ar":"بطاقات وشرائط حضور","description":"هوية الحضور والموظفين والمتحدثين.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/lanyards-badges/1791462421869-fa109ed2-9d7c-4c0f-8a71-5ded6266844b-1000080202.webp"},
          {"id":"prints","value":"prints","label_ar":"مطبوعات ومواد تعريفية","description":"بروشورات، كتيبات، بطاقات وغيرها ضمن نفس الهوية."}
        ]}
      ]}
    ]'::jsonb,
    related_service_ids=array['srv-portable-displays','srv-event-lanyards-badges'],
    updated_at=now()
where id='srv-exhibition-booths';

update public.services set catalog_role='component', updated_at=now()
where id in ('srv-portable-displays','srv-event-lanyards-badges');

update public.services
set name_ar='مطبوعات وتجهيزات مطعم أو مقهى',
    name_en='Restaurant & Cafe Printed Essentials',
    slug='restaurant-cafe-printing',
    short_description_ar='من المنيو إلى مفارش الطاولات والحوامل والورقيات المطبوعة؛ اختر ما يحتاجه مطعمك أو مقهاك من مكان واحد.',
    full_description_ar='خدمة تجمع أهم المطبوعات التي يراها ضيف المطعم أو المقهى. اختر نوع المنيو والمواد المكملة، وشاهد الخامات المقاومة للماء والزيوت والتشطيبات المناسبة للاستخدام اليومي.',
    customer_goal_ar='أريد تجهيز مطبوعات مطعم أو مقهى وأحتاج أن أرى أنواع المنيو والمواد المكملة قبل أن أقرر.',
    quantity_unit='مجموعة',
    specification_groups='[
      {"id":"grp-menu-type","title_ar":"ابدأ بالمنيو","sort_order":1,"fields":[
        {"id":"menu-type","key":"menu_type","label_ar":"نوع المنيو","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"paper","value":"paper","label_ar":"منيو ورقي مطبوع","description":"اقتصادي وسهل التحديث."},
          {"id":"laminated","value":"laminated","label_ar":"منيو مسلفن مقاوم للاستخدام","description":"عملي للمطاعم ذات الاستخدام اليومي الكثيف.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/luxury-restaurant-menus/1791462256965-d5937e98-cb27-47b7-a1e6-7154ad0f8990-1000080203.webp"},
          {"id":"premium","value":"premium","label_ar":"منيو فاخر جلد / خشب / خامات خاصة","description":"مناسب للمطاعم الراقية والفنادق.","badge":"فاخر"},
          {"id":"table","value":"table_menu","label_ar":"منيو أو عرض للطاولة","description":"حوامل وعروض صغيرة للعروض والأصناف المميزة."}
        ]}
      ]},
      {"id":"grp-hospitality-extra","title_ar":"مواد مكملة على الطاولة","sort_order":2,"fields":[
        {"id":"hospitality-items","key":"hospitality_items","label_ar":"اختر ما تحتاجه","type":"multi_select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"placemat","value":"placemat","label_ar":"مفارش طاولة مطبوعة","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/printed-tableware/1791462377366-14be3754-92a5-4e79-8b04-9e245e587518-1000080207.webp"},
          {"id":"napkin","value":"napkin","label_ar":"مناديل أو ورقيات بهوية المطعم"},
          {"id":"table-tent","value":"table_tent","label_ar":"ستاند / Tent Card للطاولة"},
          {"id":"takeaway","value":"takeaway","label_ar":"مطبوعات الطلبات الخارجية"}
        ]}
      ]}
    ]'::jsonb,
    related_service_ids=array['srv-hospitality-disposables'],
    updated_at=now()
where id='srv-restaurant-menus';

update public.services set catalog_role='component', updated_at=now()
where id='srv-hospitality-disposables';

update public.services
set name_ar='هدايا دعائية ومؤسسية',
    name_en='Promotional & Corporate Gifts',
    slug='promotional-corporate-gifts',
    short_description_ar='اختر نوع الهدية التي تناسب المناسبة والميزانية: أكواب، مطارات، أقلام، دفاتر، مجموعات VIP وغيرها مع طباعة أو حفر الهوية.',
    full_description_ar='ابدأ بالمناسبة والجمهور ثم شاهد أنواع الهدايا الممكنة. يمكن لرواج تجهيز قطعة واحدة أو مجموعة متكاملة بهوية موحدة، مع الطباعة أو الحفر أو التغليف.',
    customer_goal_ar='أريد هدايا تحمل شعار الجهة، لكن أحتاج أن أرى الأنواع والفروق قبل اختيار المنتج.',
    quantity_unit='هدية',
    specification_groups='[
      {"id":"grp-gift-purpose","title_ar":"ما المناسبة؟","sort_order":1,"fields":[
        {"id":"gift-purpose","key":"purpose","label_ar":"الاستخدام","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"clients","value":"clients","label_ar":"هدايا عملاء"},
          {"id":"vip","value":"vip","label_ar":"هدايا VIP وإدارة عليا"},
          {"id":"event","value":"event","label_ar":"فعالية أو مؤتمر"},
          {"id":"staff","value":"staff","label_ar":"موظفون وفريق عمل"},
          {"id":"season","value":"season","label_ar":"موسم أو مناسبة"}
        ]}
      ]},
      {"id":"grp-gift-types","title_ar":"استكشف أنواع الهدايا","sort_order":2,"fields":[
        {"id":"gift-types","key":"gift_types","label_ar":"الأنواع التي تهمك","type":"multi_select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"sets","value":"gift_sets","label_ar":"مجموعات هدايا متكاملة","description":"صندوق يجمع أكثر من منتج بهوية واحدة.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/vip/1791462047428-b50e916b-5152-4f7f-a569-6be6ed39d6b2-1000080190.webp","badge":"VIP"},
          {"id":"mugs","value":"mugs","label_ar":"أكواب ومطارات حرارية","description":"عملية ومناسبة للهدايا اليومية والفعاليات.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/asset/1791461327386-5a00b7e8-fb69-4849-a946-be445f1df55c-1000080181.webp"},
          {"id":"pens","value":"pens","label_ar":"أقلام"},
          {"id":"notebooks","value":"notebooks","label_ar":"دفاتر ونوت بوك"},
          {"id":"custom","value":"custom","label_ar":"منتج دعائي مخصص","description":"إذا كانت لديك فكرة غير مدرجة يمكن لرواج بحث خيارات التصنيع والتوريد."}
        ]}
      ]},
      {"id":"grp-gift-branding","title_ar":"طريقة وضع الهوية","sort_order":3,"fields":[
        {"id":"gift-branding","key":"branding","label_ar":"التنفيذ","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"print","value":"print","label_ar":"طباعة ملونة"},
          {"id":"laser","value":"laser","label_ar":"حفر ليزري","description":"مظهر دائم وراقي على المعادن والخشب وبعض الخامات."},
          {"id":"uv","value":"uv","label_ar":"UV مباشر","description":"طباعة ملونة مباشرة على أسطح مناسبة."},
          {"id":"mixed","value":"mixed","label_ar":"مزيج حسب المنتجات"}
        ]}
      ]}
    ]'::jsonb,
    related_service_ids=array['srv-promotional-mugs'],
    updated_at=now()
where id='srv-corporate-gift-sets';

update public.services set catalog_role='component', updated_at=now()
where id='srv-promotional-mugs';

update public.services
set name_ar='فواتير وسندات ودفاتر إدارية',
    name_en='Invoices, Receipts & NCR Business Forms',
    slug='invoices-receipts-business-forms',
    short_description_ar='فواتير، سند قبض، سند صرف ونماذج إدارية بعدد النسخ والترقيم والمقاسات التي تحتاجها.',
    full_description_ar='اختر نوع الدفتر أو النموذج، عدد النسخ في كل مجموعة، المقاس، الترقيم وما إذا كنت تحتاج تصميم النموذج. لا تحتاج لمعرفة مصطلح NCR مسبقاً؛ رواج تضبط نوع الورق وطريقة الإنتاج حسب الاستخدام والكمية.',
    customer_goal_ar='أريد فواتير أو سندات أو دفاتر إدارية مطبوعة وأحتاج تحديد النوع والكمية وعدد النسخ.',
    quantity_unit='دفتر',
    specification_groups='[
      {"id":"grp-form-type","title_ar":"ما النموذج الذي تحتاجه؟","sort_order":1,"fields":[
        {"id":"form-type","key":"form_type","label_ar":"نوع النموذج","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"invoice","value":"invoice","label_ar":"فاتورة مبيعات","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/ncr/1791460823838-d25b4e68-0374-4ca6-bfb6-9a0f94d58177-1000080173.webp"},
          {"id":"receipt","value":"receipt","label_ar":"سند قبض"},
          {"id":"payment","value":"payment","label_ar":"سند صرف"},
          {"id":"delivery","value":"delivery","label_ar":"إذن تسليم / استلام"},
          {"id":"custom","value":"custom","label_ar":"نموذج إداري مخصص"}
        ]}
      ]},
      {"id":"grp-form-copies","title_ar":"عدد النسخ والمقاس","sort_order":2,"fields":[
        {"id":"copies","key":"copies","label_ar":"عدد النسخ في كل نموذج","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"2copy","value":"2","label_ar":"نسختان"},
          {"id":"3copy","value":"3","label_ar":"3 نسخ","badge":"شائع"},
          {"id":"4copy","value":"4","label_ar":"4 نسخ"}
        ]},
        {"id":"form-size","key":"size","label_ar":"المقاس","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":2,"options":[
          {"id":"a4","value":"A4","label_ar":"A4"},
          {"id":"a5","value":"A5","label_ar":"A5"},
          {"id":"half","value":"half","label_ar":"نصف A4 / مقاس قريب"},
          {"id":"custom","value":"custom","label_ar":"مقاس مخصص"}
        ]},
        {"id":"serial","key":"serial","label_ar":"ترقيم تسلسلي","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":3,"options":[
          {"id":"yes","value":"yes","label_ar":"نعم"},
          {"id":"no","value":"no","label_ar":"لا"}
        ]}
      ]}
    ]'::jsonb,
    updated_at=now()
where id='srv-ncr-invoices';

update public.services
set name_ar='علب وتغليف المنتجات',
    name_en='Custom Product Boxes & Packaging',
    slug='product-boxes-packaging',
    short_description_ar='علب للمنتجات والعطور ومستحضرات التجميل والهدايا بأشكال وخامات وتشطيبات مختلفة؛ من العلبة المطوية الاقتصادية إلى الصندوق الصلب الفاخر.',
    full_description_ar='اختر نوع المنتج ثم شاهد مستويات التغليف الممكنة. الصفحة تشرح الفرق بين العلبة المطوية والصندوق الصلب الفاخر والخامات والتشطيبات، مع إمكانية ترك المقاسات والخيار الفني لرواج.',
    customer_goal_ar='لدي منتج وأريد له علبة أو تغليفاً مناسباً، لكن أريد أن أرى أنواع العلب ومستويات الفخامة قبل الاختيار.',
    quantity_unit='علبة',
    specification_groups='[
      {"id":"grp-box-style","title_ar":"اختر مستوى العلبة","sort_order":1,"fields":[
        {"id":"box-style","key":"box_style","label_ar":"نوع العلبة","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"folding","value":"folding","label_ar":"علبة كرتون مطوية","description":"اقتصادية وعملية للكميات التجارية والمنتجات الاستهلاكية.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/folding-cartons/1791461194712-5330347d-ac0f-4685-88f3-5ce6b3cf9204-1000080178.webp","badge":"الأكثر استخداماً"},
          {"id":"rigid","value":"rigid","label_ar":"صندوق صلب فاخر Rigid Box","description":"هيكل قوي ومظهر فاخر للهدايا والعطور والمنتجات الراقية.","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/rigid-luxury-gift-boxes/1791461579030-cb21d8b6-fd2c-4fcf-920f-d3994f571262-1000080185.webp","badge":"فاخر"},
          {"id":"window","value":"window","label_ar":"علبة بنافذة شفافة","description":"تظهر المنتج جزئياً داخل العبوة."},
          {"id":"sleeve","value":"sleeve","label_ar":"Sleeve / غلاف منزلق","description":"حل بسيط وأنيق لتغليف علبة أو منتج قائم."}
        ]}
      ]},
      {"id":"grp-box-finish","title_ar":"التشطيبات","sort_order":2,"fields":[
        {"id":"box-finishes","key":"finishes","label_ar":"اختر ما يعجبك","type":"multi_select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"matt","value":"matt","label_ar":"سلفنة مطفية"},
          {"id":"gloss","value":"gloss","label_ar":"سلفنة لامعة"},
          {"id":"foil","value":"foil","label_ar":"بصمة ذهبية / فضية","badge":"فاخر"},
          {"id":"spot","value":"spot_uv","label_ar":"Spot UV"},
          {"id":"emboss","value":"emboss","label_ar":"بروز أو غائر"},
          {"id":"window","value":"window_cut","label_ar":"قص نافذة"}
        ]}
      ]}
    ]'::jsonb,
    related_service_ids=array['srv-rigid-gift-boxes'],
    updated_at=now()
where id='srv-folding-cartons';

update public.services set catalog_role='component', updated_at=now()
where id='srv-rigid-gift-boxes';

update public.services
set name_ar='طباعة على الأكريليك والخشب والمعادن والأسطح الخاصة',
    name_en='Direct Printing on Acrylic, Wood, Metal & Specialty Surfaces',
    slug='direct-print-special-surfaces',
    short_description_ar='اطبع شعاراً أو صورة أو رسماً مباشرة على الأكريليك والخشب والمعادن والزجاج وخامات أخرى بدل الملصقات التقليدية.',
    full_description_ar='خدمة للطباعة المباشرة على الخامات الصلبة. اختر السطح والاستخدام والمقاس التقريبي، ثم تحدد رواج التقنية والتحضير المناسبين للحصول على أفضل ثبات ووضوح.',
    customer_goal_ar='لدي قطعة أو سطح وأريد الطباعة عليه مباشرة ولا أعرف إن كانت خامته مناسبة.',
    quantity_unit='قطعة',
    specification_groups='[
      {"id":"grp-surface","title_ar":"على ماذا تريد الطباعة؟","sort_order":1,"fields":[
        {"id":"surface","key":"surface","label_ar":"الخامة","type":"select","required":false,"allow_rawaj_recommendation":true,"sort_order":1,"options":[
          {"id":"acrylic","value":"acrylic","label_ar":"أكريليك","image_url":"https://jidrhknvrctqzquyurxl.supabase.co/storage/v1/object/public/rawaj-media/uv-flatbed-uv/1791461853387-a6558205-5355-48d3-bd0a-ad5a3b03b636-1000080191.webp"},
          {"id":"wood","value":"wood","label_ar":"خشب / MDF"},
          {"id":"metal","value":"metal","label_ar":"معدن"},
          {"id":"glass","value":"glass","label_ar":"زجاج"},
          {"id":"other","value":"other","label_ar":"خامة أخرى","description":"أرسل صورة أو وصف الخامة ليتأكد الفريق من ملاءمتها."}
        ]}
      ]}
    ]'::jsonb,
    updated_at=now()
where id='srv-uv-flatbed-direct';
