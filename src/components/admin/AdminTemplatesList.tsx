import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Plus, Trash2, Edit3, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceTemplate, SpecificationGroup } from '../../types';

export const AdminTemplatesList: React.FC = () => {
  const { templates, departments, createTemplate, updateTemplate, deleteTemplate } = useApp();

  const [editingTemplate, setEditingTemplate] = useState<ServiceTemplate | null>(null);

  return (
    <div className="space-y-6 text-right pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white">
            مكتبة قوالب المواصفات الفنية القياسية (Template Library)
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            قوالب هياكل ومواصفات يعاد استخدامها عند إضافة أي خدمة جديدة (NCR، ستيكر، علب، سيارات، ليزر...)
          </p>
        </div>

        <button
          onClick={() => {
            const newTmpl = createTemplate({
              name_ar: 'قالب مواصفات مخصص جديد',
              name_en: 'New Custom Template',
              code: `TMPL_${Date.now().toString().slice(-4)}`,
              description_ar: 'وصف لمجال استخدام هذا القالب',
              department_id: departments[0]?.id || '',
              specification_groups: [
                {
                  id: `grp-${Date.now()}`,
                  title_ar: 'المواصفات العامة',
                  sort_order: 1,
                  fields: [
                    {
                      id: `f-${Date.now()}`,
                      key: 'standard_spec',
                      label_ar: 'الخامة أو المقاس',
                      type: 'select',
                      required: true,
                      sort_order: 1,
                      options: [
                        { id: '1', label_ar: 'الخيار القياسي الأول', value: 'opt_1' },
                        { id: '2', label_ar: 'الخيار الثاني', value: 'opt_2' },
                      ],
                    },
                  ],
                },
              ],
            });
            setEditingTemplate(newTmpl);
          }}
          className="bg-[#B9142D] hover:bg-[#930F23] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ إنشاء قالب فني جديد</span>
        </button>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((tmpl) => {
          const dept = departments.find((d) => d.id === tmpl.department_id);
          const totalFields = tmpl.specification_groups?.reduce((acc, g) => acc + (g.fields?.length || 0), 0) || 0;

          return (
            <div
              key={tmpl.id}
              className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] hover:border-[#B9142D] p-4 flex flex-col justify-between shadow-xs space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#B9142D] bg-[#FDE8EA] dark:bg-[#3D1217] px-2 py-0.5 rounded">
                    {dept?.name_ar || 'عام'}
                  </span>
                  <span className="text-[10px] font-mono text-[#78716C]">{tmpl.code}</span>
                </div>

                <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white">
                  {tmpl.name_ar}
                </h3>

                <p className="text-xs text-[#78716C] dark:text-[#A8A29E] line-clamp-2">
                  {tmpl.description_ar}
                </p>

                <div className="p-2 bg-[#FAF7F2] dark:bg-[#252222] rounded-lg text-[11px] text-[#57534E] dark:text-[#D6D3D1] flex items-center justify-between">
                  <span>{tmpl.specification_groups?.length || 0} مجموعات</span>
                  <span>•</span>
                  <span>{totalFields} حقول فنية معتمدة</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F5F1E9] dark:border-[#252222] flex items-center justify-between">
                <button
                  onClick={() => {
                    if (window.confirm(`هل أنت متأكد من حذف قالب «${tmpl.name_ar}»؟`)) {
                      deleteTemplate(tmpl.id);
                    }
                  }}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف</span>
                </button>

                <button
                  onClick={() => setEditingTemplate(tmpl)}
                  className="text-xs font-bold text-[#B9142D] hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل القالب</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Template Quick Modal */}
      {editingTemplate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs"
          onClick={() => setEditingTemplate(null)}
        >
          <div 
            className="w-full max-w-xl bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-5 space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E0D3] dark:border-[#332F2F]">
              <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white">
                تعديل بيانات القالب الفني
              </h3>
              <button
                onClick={() => setEditingTemplate(null)}
                className="text-xs bg-[#FAF7F2] dark:bg-[#252222] px-2.5 py-1 rounded-lg"
              >
                إغلاق
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold">اسم القالب (عربي):</label>
                <input
                  type="text"
                  value={editingTemplate.name_ar}
                  onChange={(e) => {
                    const next = { ...editingTemplate, name_ar: e.target.value };
                    setEditingTemplate(next);
                    updateTemplate(editingTemplate.id, { name_ar: e.target.value });
                  }}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-3 py-1.5"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">وصف القالب ومجال استخدامه:</label>
                <textarea
                  rows={2}
                  value={editingTemplate.description_ar}
                  onChange={(e) => {
                    const next = { ...editingTemplate, description_ar: e.target.value };
                    setEditingTemplate(next);
                    updateTemplate(editingTemplate.id, { description_ar: e.target.value });
                  }}
                  className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded p-2"
                />
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 text-[11px]">
                ✓ يتم تحديث القالب تلقائياً. عند إنشاء أي خدمة جديدة واختيار هذا القالب، سيتم استيراد كافة حقوله.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
