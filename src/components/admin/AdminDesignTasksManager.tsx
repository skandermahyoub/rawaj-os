import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Palette, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  User as UserIcon, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  FileText, 
  Upload, 
  ChevronLeft, 
  X, 
  Sparkles, 
  Printer, 
  Eye, 
  Send, 
  Calendar, 
  Download,
  Trash2,
  Edit3,
  Paperclip,
  Check,
  ShieldCheck
} from 'lucide-react';
import { DesignTask, DesignTaskStatus, User } from '../../types';
import { removeRawajStorageObject, uploadFileToRawajStorage } from '../../lib/storage';

export const AdminDesignTasksManager: React.FC = () => {
  const { 
    designTasks, 
    createDesignTask, 
    updateDesignTask, 
    addDesignProof, 
    addDesignComment, 
    deleteDesignTask, 
    users,
    currentUser,
    departments,
    services
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedDesignerFilter, setSelectedDesignerFilter] = useState<string>('all');
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Task Form State
  const [newTaskData, setNewTaskData] = useState({
    title_ar: '',
    client_name: '',
    client_phone: '',
    department_id: '',
    service_id: '',
    designer_id: '',
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
    deadline: '',
    description_ar: '',
    dimensions_notes: '',
    required_format: 'Adobe Illustrator Vector (AI + PDF Print CMYK 300DPI)',
  });

  // Proof Upload Form State (inside Active Task Workspace)
  const [newProofData, setNewProofData] = useState({
    notes_ar: '',
  });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isUploadingProof, setIsUploadingProof] = useState(false);
  const [actionError, setActionError] = useState('');

  // Comment Form State
  const [commentText, setCommentText] = useState('');
  const [commentStatusChange, setCommentStatusChange] = useState<DesignTaskStatus | ''>('');

  // Designers List
  const designers = users.filter((u) => u.role === 'designer' || u.role === 'owner' || u.role === 'admin');
  const canManageTasks = ['owner', 'admin', 'sales'].includes(currentUser.role);
  const canDeleteTasks = ['owner', 'admin'].includes(currentUser.role);
  const isDesigner = currentUser.role === 'designer';

  // Designers only see work assigned to their own account; managers retain the full queue.
  const visibleTasks = isDesigner
    ? designTasks.filter((task) => task.designer_id === currentUser.id)
    : designTasks;
  const activeTask = visibleTasks.find((t) => t.id === activeTaskId);

  // Filtered Tasks
  const filteredTasks = visibleTasks.filter((task) => {
    const matchesSearch = 
      task.title_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.designer_name && task.designer_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatusFilter === 'all' || task.status === selectedStatusFilter;
    const matchesDesigner = selectedDesignerFilter === 'all' || task.designer_id === selectedDesignerFilter;

    return matchesSearch && matchesStatus && matchesDesigner;
  });

  // Status Stats
  const totalTasks = visibleTasks.length;
  const inProgressCount = visibleTasks.filter((t) => t.status === 'in_progress' || t.status === 'assigned').length;
  const proofSubmittedCount = visibleTasks.filter((t) => t.status === 'proof_submitted' || t.status === 'feedback_requested').length;
  const approvedCount = visibleTasks.filter((t) => t.status === 'approved' || t.status === 'sent_to_print' || t.status === 'completed').length;

  const getStatusBadge = (status: DesignTaskStatus) => {
    switch (status) {
      case 'new':
        return { label: 'طلب جديد', color: 'bg-brand-primary-10 text-brand-primary border-brand-primary/30' };
      case 'assigned':
        return { label: 'تم الإسناد للمصمم', color: 'bg-brand-accent-10 text-brand-accent border-brand-accent/30' };
      case 'in_progress':
        return { label: 'قيد التصميم', color: 'bg-amber-500/10 text-amber-600 border-amber-500/30' };
      case 'proof_submitted':
        return { label: 'تم رفع البروفة', color: 'bg-brand-primary-15 text-brand-primary border-brand-primary/30 font-bold' };
      case 'feedback_requested':
        return { label: 'طلب تعديل وملاحظات', color: 'bg-orange-500/10 text-orange-600 border-orange-500/30' };
      case 'approved':
        return { label: 'معتمد فنياً', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-bold' };
      case 'sent_to_print':
        return { label: 'مُحول لمصنع الطباعة', color: 'bg-brand-primary text-white border-brand-primary font-bold' };
      case 'completed':
        return { label: 'مكتمل ومُسلم', color: 'bg-[#FAF7F2] dark:bg-[#252222] text-[#78716C] dark:text-[#A8A29E] border-[#E7E0D3] dark:border-[#332F2F]' };
      default:
        return { label: status, color: 'bg-[#FAF7F2] dark:bg-[#252222] text-[#78716C] dark:text-[#A8A29E] border-[#E7E0D3] dark:border-[#332F2F]' };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return { label: 'عاجل جداً', color: 'bg-rose-500 text-white' };
      case 'high':
        return { label: 'أولوية مرتفعة', color: 'bg-amber-500 text-white' };
      case 'normal':
        return { label: 'أولوية عادية', color: 'bg-gray-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300' };
      case 'low':
        return { label: 'منخفضة', color: 'bg-gray-100 text-gray-500' };
      default:
        return { label: priority, color: 'bg-gray-100 text-gray-500' };
    }
  };

  const handleCreateTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskData.title_ar || !newTaskData.client_name) {
      setActionError('يرجى كتابة عنوان المشروع واسم العميل.');
      return;
    }

    const assignedDesigner = designers.find((d) => d.id === newTaskData.designer_id);
    setActionError('');

    try {
      await createDesignTask({
        title_ar: newTaskData.title_ar,
        client_name: newTaskData.client_name,
        client_phone: newTaskData.client_phone,
        department_id: newTaskData.department_id || undefined,
        service_id: newTaskData.service_id || undefined,
        designer_id: newTaskData.designer_id || undefined,
        designer_name: assignedDesigner ? assignedDesigner.name : undefined,
        priority: newTaskData.priority,
        deadline: newTaskData.deadline || undefined,
        status: newTaskData.designer_id ? 'assigned' : 'new',
        description_ar: newTaskData.description_ar,
        dimensions_notes: newTaskData.dimensions_notes,
        required_format: newTaskData.required_format,
      });

      setIsCreateModalOpen(false);
      setNewTaskData({
        title_ar: '',
        client_name: '',
        client_phone: '',
        department_id: '',
        service_id: '',
        designer_id: '',
        priority: 'normal',
        deadline: '',
        description_ar: '',
        dimensions_notes: '',
        required_format: 'Adobe Illustrator Vector (AI + PDF Print CMYK 300DPI)',
      });
    } catch (error: any) {
      setActionError(error?.message || 'تعذر إنشاء مهمة التصميم.');
    }
  };

  const handleUploadProofSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTaskId || !proofFile) {
      setActionError('اختر ملف البروفة أولاً.');
      return;
    }
    if (!/\.(png|jpe?g|webp|gif|pdf|ai|eps|svg|zip)$/i.test(proofFile.name)) {
      setActionError('نوع الملف غير مدعوم. استخدم صورة أو PDF أو AI أو EPS أو SVG أو ZIP.');
      return;
    }
    if (proofFile.size > 50 * 1024 * 1024) {
      setActionError('حجم الملف يتجاوز الحد المسموح (50 ميجابايت).');
      return;
    }

    const nextVersion = (activeTask?.proof_versions.length || 0) + 1;
    setActionError('');
    setIsUploadingProof(true);
    let uploadedPath: string | null = null;

    try {
      const stored = await uploadFileToRawajStorage(proofFile, {
        folder: `design-proofs/${activeTaskId}`,
        fileName: proofFile.name,
      });
      uploadedPath = stored.path;

      await addDesignProof(activeTaskId, {
        version_number: nextVersion,
        preview_url: stored.publicUrl,
        file_name: proofFile.name,
        file_size: `${stored.sizeKb} KB`,
        uploaded_by_id: currentUser.id,
        uploaded_by_name: currentUser.name,
        notes_ar: newProofData.notes_ar,
      });

      // The database record now owns this object; only clean it up if saving failed.
      uploadedPath = null;
      setProofFile(null);
      setNewProofData({ notes_ar: '' });
    } catch (error: any) {
      let cleanupFailed = false;
      if (uploadedPath) {
        try {
          await removeRawajStorageObject(uploadedPath);
        } catch {
          cleanupFailed = true;
        }
      }
      const message = error?.message || 'تعذر حفظ البروفة.';
      setActionError(cleanupFailed
        ? `${message} كما تعذر حذف الملف المؤقت من التخزين؛ يرجى مراجعة المكتبة.`
        : message);
    } finally {
      setIsUploadingProof(false);
    }
  };

  const handleAddCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTaskId || !commentText.trim()) return;

    setActionError('');
    try {
      await addDesignComment(activeTaskId, {
        author_id: currentUser.id,
        author_name: currentUser.name,
        author_role: currentUser.role,
        text: commentText.trim(),
        status_change: commentStatusChange || undefined,
      });

      setCommentText('');
      setCommentStatusChange('');
    } catch (error: any) {
      setActionError(error?.message || 'تعذر حفظ التعليق.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {actionError && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-bold">
          {actionError}
        </div>
      )}

      {/* 1. Header Banner & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#141211] border border-[#E8E2D5] dark:border-[#262320] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B9142D]/10 text-[#B9142D] text-xs font-bold">
            <Palette className="w-3.5 h-3.5" />
            <span>منظومة تصميم الجرافيك والبروفات الطباعية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-[#171616] dark:text-[#F7F5F0]">
            قسم إدارة المصممين وتسليم أعمال الطباعة
          </h2>
          <p className="text-xs text-[#70695F] dark:text-[#A8A196]">
            إسناد المهام للمصممين، رفع البروفات الأولية، ومراجعة ملاحظات الإدارة والعملاء مع اعتماد ملفات الطباعة النهائية.
          </p>
        </div>

        {canManageTasks && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-[#B9142D] hover:bg-[#A01026] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة طلب تصميم جديد</span>
          </button>
        )}
      </div>

      {/* 2. Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#70695F] dark:text-[#A8A196] block">إجمالي طلبات التصميم</span>
            <span className="text-2xl font-black text-[#171616] dark:text-[#F7F5F0] font-heading">{totalTasks}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#252220] text-[#171616] dark:text-white">
            <Palette className="w-5 h-5 text-[#B9142D]" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#70695F] dark:text-[#A8A196] block">قيد الإنجاز والتصميم</span>
            <span className="text-2xl font-black text-amber-600 font-heading">{inProgressCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#70695F] dark:text-[#A8A196] block">بروفات بانتظار المراجعة</span>
            <span className="text-2xl font-black text-[#B9142D] font-heading">{proofSubmittedCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#B9142D]/10 text-[#B9142D]">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1816] border border-[#E8E2D5] dark:border-[#2D2A26] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#70695F] dark:text-[#A8A196] block">معتمدة ومُحولة للمطبعة</span>
            <span className="text-2xl font-black text-emerald-600 font-heading">{approvedCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#141211] border border-[#E8E2D5] dark:border-[#262320]">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#867F75] dark:text-[#9E978C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث باسم المشروع، العميل، أو المصمم..."
            className="w-full pr-9 pl-4 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#1C1918] border border-[#E8E2D5] dark:border-[#2D2A26] text-xs font-semibold text-[#171616] dark:text-[#F7F5F0] focus:outline-hidden focus:border-[#B9142D]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'assigned', label: 'المُسندة' },
            { id: 'in_progress', label: 'قيد التصميم' },
            { id: 'proof_submitted', label: 'بروفات مرفوعة' },
            { id: 'approved', label: 'معتمدة' },
            { id: 'sent_to_print', label: 'بالمطبعة' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedStatusFilter === tab.id
                  ? 'bg-[#B9142D] text-white'
                  : 'text-[#70695F] dark:text-[#A8A196] hover:bg-[#FAF8F5] dark:hover:bg-[#1E1B1A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Designer Selector Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-[#867F75]" />
          <select
            value={selectedDesignerFilter}
            onChange={(e) => setSelectedDesignerFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#1C1918] border border-[#E8E2D5] dark:border-[#2D2A26] text-xs font-semibold text-[#171616] dark:text-[#F7F5F0] focus:outline-hidden"
          >
            <option value="all">جميع المصممين</option>
            {designers.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* 4. Design Tasks List / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => {
          const statusInfo = getStatusBadge(task.status);
          const priorityInfo = getPriorityBadge(task.priority);

          return (
            <div
              key={task.id}
              onClick={() => setActiveTaskId(task.id)}
              className="p-5 rounded-2xl bg-white dark:bg-[#141211] border border-[#E8E2D5] dark:border-[#262320] hover:border-[#B9142D]/60 dark:hover:border-[#B9142D]/60 shadow-xs transition-all flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                {/* Top Badges Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${priorityInfo.color}`}>
                    {priorityInfo.label}
                  </span>
                </div>

                {/* Title and Client */}
                <div>
                  <h3 className="font-heading font-black text-sm text-[#171616] dark:text-[#F7F5F0] group-hover:text-[#B9142D] transition-colors line-clamp-2">
                    {task.title_ar}
                  </h3>
                  <p className="text-xs font-semibold text-[#70695F] dark:text-[#A8A196] mt-1">
                    العميل: {task.client_name}
                  </p>
                </div>

                <p className="text-[11px] text-[#867F75] dark:text-[#9E978C] line-clamp-2 leading-relaxed">
                  {task.description_ar}
                </p>
              </div>

              {/* Designer & Proof Status Footer */}
              <div className="pt-3 border-t border-[#E8E2D5]/70 dark:border-[#262320] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FAF8F5] dark:bg-[#252220] border border-[#E8E2D5] dark:border-[#2D2A26] flex items-center justify-center text-[#B9142D] font-bold text-[10px]">
                    <UserIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-[#171616] dark:text-[#F7F5F0] truncate max-w-[130px]">
                    {task.designer_name || 'غير مُسند'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#70695F] dark:text-[#A8A196]">
                  <span className="flex items-center gap-1" title="عدد البروفات">
                    <FileText className="w-3.5 h-3.5 text-[#B9142D]" />
                    <span>{task.proof_versions.length}</span>
                  </span>
                  <span className="flex items-center gap-1" title="عدد الملاحظات والتعليقات">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                    <span>{task.comments.length}</span>
                  </span>
                </div>
              </div>

            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-3xl bg-white dark:bg-[#141211] border border-[#E8E2D5] dark:border-[#262320] space-y-3">
            <Palette className="w-10 h-10 text-[#867F75] mx-auto opacity-50" />
            <h3 className="font-heading font-black text-sm text-[#171616] dark:text-[#F7F5F0]">
              لا توجد طلبات تصميم مطابقة
            </h3>
            <p className="text-xs text-[#70695F] dark:text-[#A8A196]">
              يمكنك إضافة طلب تصميم جديد أو تغيير خيارات التصفية والبحث.
            </p>
          </div>
        )}
      </div>

      {/* 5. ACTIVE TASK WORKSPACE DRAWER / MODAL */}
      {activeTask && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveTaskId(null)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-2xl bg-[#FAF8F5] dark:bg-[#12100F] border-l border-[#E8E2D5] dark:border-[#262320] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#E8E2D5] dark:border-[#262320] bg-white dark:bg-[#181615] sticky top-0 z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${getStatusBadge(activeTask.status).color}`}>
                      {getStatusBadge(activeTask.status).label}
                    </span>
                    <span className="text-xs text-[#70695F] dark:text-[#A8A196]">
                      كود المهمة: #{activeTask.id}
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-base text-[#171616] dark:text-[#F7F5F0]">
                    {activeTask.title_ar}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveTaskId(null)}
                  className="p-2 rounded-xl bg-[#FAF8F5] dark:bg-[#252220] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#70695F] hover:text-[#B9142D] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Workspace */}
              <div className="p-6 space-y-6 flex-1">
                
                {/* Client & Specs Card */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#181615] border border-[#E8E2D5] dark:border-[#262320] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#171616] dark:text-[#F7F5F0]">العميل: {activeTask.client_name}</span>
                    {activeTask.client_phone && (
                      <span className="text-[#867F75]" dir="ltr">{activeTask.client_phone}</span>
                    )}
                  </div>

                  <p className="text-xs text-[#70695F] dark:text-[#A8A196] leading-relaxed">
                    {activeTask.description_ar}
                  </p>

                  {activeTask.dimensions_notes && (
                    <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#201D1C] border border-[#E8E2D5] dark:border-[#2D2A26] text-xs space-y-1">
                      <span className="font-bold text-[#B9142D] block">المقاسات وهامش النزيف (Bleed):</span>
                      <span className="text-[#171616] dark:text-[#F7F5F0]">{activeTask.dimensions_notes}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-[#867F75] dark:text-[#9E978C] pt-2 border-t border-[#E8E2D5]/60 dark:border-[#262320]">
                    <span>الصيغة المطلوبة: {activeTask.required_format || 'AI / PDF CMYK 300DPI'}</span>
                    <span>الموعد النهائي: {activeTask.deadline || 'غير محدد'}</span>
                  </div>
                </div>

                {/* Designer Assignment Selector */}
                {canManageTasks && (
                <div className="p-4 rounded-2xl bg-white dark:bg-[#181615] border border-[#E8E2D5] dark:border-[#262320] space-y-2">
                  <label className="block text-xs font-bold text-[#171616] dark:text-[#F7F5F0]">
                    إسناد أو تغيير المصمم المسؤول:
                  </label>
                  <select
                    value={activeTask.designer_id || ''}
                    onChange={(e) => {
                      const selectedDes = designers.find((d) => d.id === e.target.value);
                      const nextDesignerId = e.target.value;
                      void (async () => {
                        try {
                          setActionError('');
                          await updateDesignTask(activeTask.id, {
                            designer_id: nextDesignerId || undefined,
                            designer_name: selectedDes ? selectedDes.name : undefined,
                            status: nextDesignerId ? 'assigned' : 'new',
                          });
                        } catch (error: any) {
                          setActionError(error?.message || 'تعذر تحديث المصمم المسؤول.');
                        }
                      })();
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#201D1C] border border-[#E8E2D5] dark:border-[#2D2A26] text-xs font-semibold text-[#171616] dark:text-[#F7F5F0]"
                  >
                    <option value="">-- اختاري مصمماً لإسناد المهمة --</option>
                    {designers.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.role})</option>
                    ))}
                  </select>
                </div>
                )}

                {/* Proof Versions Area */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F7F5F0] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#B9142D]" />
                      <span>سجل البروفات والملفات المرفوعة ({activeTask.proof_versions.length})</span>
                    </h4>
                  </div>

                  {/* Proof Versions List */}
                  <div className="space-y-3">
                    {activeTask.proof_versions.map((proof) => (
                      <div 
                        key={proof.id}
                        className="p-4 rounded-2xl bg-white dark:bg-[#181615] border border-[#E8E2D5] dark:border-[#262320] space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden border border-[#E8E2D5] shrink-0">
                              <img src={proof.preview_url} alt={proof.file_name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="px-2 py-0.5 rounded bg-[#B9142D] text-white text-[10px] font-bold inline-block mb-1">
                                البروفة v{proof.version_number}
                              </span>
                              <h5 className="font-bold text-xs text-[#171616] dark:text-[#F7F5F0]">{proof.file_name}</h5>
                              <span className="text-[10px] text-[#867F75]">بواسطة: {proof.uploaded_by_name} ({proof.file_size})</span>
                            </div>
                          </div>

                          <a
                            href={proof.preview_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-[#FAF8F5] dark:bg-[#252220] text-[#171616] dark:text-white border hover:bg-[#B9142D] hover:text-white transition-colors text-xs font-bold flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>معاينة</span>
                          </a>
                        </div>

                        {proof.notes_ar && (
                          <p className="text-xs text-[#70695F] dark:text-[#A8A196] bg-[#FAF8F5] dark:bg-[#201D1C] p-2.5 rounded-xl border border-[#E8E2D5]/60">
                            ملاحظة المرفوعات: {proof.notes_ar}
                          </p>
                        )}
                      </div>
                    ))}

                    {activeTask.proof_versions.length === 0 && (
                      <div className="p-6 text-center rounded-2xl bg-white dark:bg-[#181615] border border-dashed border-[#E8E2D5] text-xs text-[#867F75]">
                        لم يتم رفع أي بروفة لهذه المهمة حتى الآن.
                      </div>
                    )}
                  </div>

                  {/* Upload New Proof Form */}
                  <form onSubmit={handleUploadProofSubmit} className="p-4 rounded-2xl bg-white dark:bg-[#181615] border border-[#E8E2D5] dark:border-[#262320] space-y-3">
                    <span className="font-heading font-black text-xs text-[#171616] dark:text-[#F7F5F0] block">
                      رفع بروفة جديدة (للمصمم):
                    </span>

                    <div className="space-y-2 text-xs">
                      <label className="block text-[11px] font-bold text-[#867F75]">ملف البروفة الفعلي</label>
                      <input
                        type="file"
                        required
                        accept="image/*,.pdf,.ai,.eps,.svg,.zip"
                        onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#201D1C] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0]"
                      />
                      {proofFile && (
                        <div className="text-[11px] text-emerald-700 dark:text-emerald-300">
                          سيتم رفع: {proofFile.name} — {Math.max(1, Math.round(proofFile.size / 1024))} KB
                        </div>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        value={newProofData.notes_ar}
                        onChange={(e) => setNewProofData({ ...newProofData, notes_ar: e.target.value })}
                        placeholder="توضيح التعديلات في هذه البروفة (اختياري)..."
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#201D1C] border border-[#E8E2D5] dark:border-[#2D2A26] text-xs text-[#171616] dark:text-[#F7F5F0]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isUploadingProof}
                      className="w-full py-2.5 rounded-xl bg-[#171616] dark:bg-[#F7F5F0] text-white dark:text-[#171616] font-bold text-xs hover:bg-[#B9142D] dark:hover:bg-[#B9142D] dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isUploadingProof ? 'جارٍ الرفع إلى Supabase...' : 'تسليم ورفع البروفة الآن'}
                    </button>
                  </form>
                </div>

                {/* Review & Comments Thread System */}
                <div className="space-y-4">
                  <h4 className="font-heading font-black text-sm text-[#171616] dark:text-[#F7F5F0] flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <span>ملاحظات المراجعة والتعليقات المباشرة ({activeTask.comments.length})</span>
                  </h4>

                  {/* Comments Thread */}
                  <div className="space-y-3">
                    {activeTask.comments.map((comm) => (
                      <div 
                        key={comm.id}
                        className="p-3.5 rounded-2xl bg-white dark:bg-[#181615] border border-[#E8E2D5] dark:border-[#262320] space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#171616] dark:text-[#F7F5F0]">{comm.author_name} ({comm.author_role})</span>
                          <span className="text-[10px] text-[#867F75]">{new Date(comm.created_at).toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-xs text-[#70695F] dark:text-[#A8A196] leading-relaxed">{comm.text}</p>
                        {comm.status_change && (
                          <span className="inline-block px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 text-[10px] font-bold">
                            تغيير الحالة: {getStatusBadge(comm.status_change).label}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Comment Form */}
                  <form onSubmit={handleAddCommentSubmit} className="space-y-3">
                    <textarea
                      rows={2}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="اكتبي تعليقك أو ملاحظات التعديل هنا..."
                      className="w-full p-3 rounded-2xl bg-white dark:bg-[#181615] border border-[#E8E2D5] dark:border-[#262320] text-xs text-[#171616] dark:text-[#F7F5F0] focus:outline-hidden focus:border-[#B9142D]"
                    />

                    <div className="flex items-center gap-3">
                      <select
                        value={commentStatusChange}
                        onChange={(e) => setCommentStatusChange(e.target.value as DesignTaskStatus)}
                        className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#181615] border border-[#E8E2D5] dark:border-[#262320] text-xs font-semibold text-[#171616] dark:text-[#F7F5F0]"
                      >
                        <option value="">بدون تغيير حالة المهمة</option>
                        {isDesigner ? (
                          <>
                            <option value="in_progress">قيد التنفيذ</option>
                            <option value="proof_submitted">تم رفع البروفة للمراجعة</option>
                          </>
                        ) : (
                          <>
                            <option value="feedback_requested">طلب تعديلات إضافية من المصمم</option>
                            <option value="approved">اعتماد البروفة فنياً</option>
                            <option value="sent_to_print">تحويل الملف النهائي لمصنع الطباعة</option>
                            <option value="completed">مكتمل ومُسلم</option>
                          </>
                        )}
                      </select>

                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#B9142D] hover:bg-[#A01026] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        إرسال التعليق
                      </button>
                    </div>
                  </form>
                </div>

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-[#E8E2D5] dark:border-[#262320] bg-white dark:bg-[#151312] flex items-center justify-between">
                {canDeleteTasks ? (
                  <button
                    onClick={() => {
                      if (!window.confirm('هل أنت متأكد من حذف مهمة التصميم هذه؟')) return;
                      void (async () => {
                        try {
                          setActionError('');
                          await deleteDesignTask(activeTask.id);
                          setActiveTaskId(null);
                        } catch (error: any) {
                          setActionError(error?.message || 'تعذر حذف المهمة.');
                        }
                      })();
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>حذف المهمة</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-[#867F75]">الحذف متاح للمالك ومدير العمليات فقط.</span>
                )}

                <button
                  onClick={() => setActiveTaskId(null)}
                  className="px-6 py-2 rounded-xl bg-[#171616] dark:bg-[#F7F5F0] text-white dark:text-[#171616] font-bold text-xs"
                >
                  إغلاق المساحة
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 6. CREATE NEW TASK MODAL */}
      {isCreateModalOpen && canManageTasks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] dark:bg-[#141211] rounded-3xl border border-[#E8E2D5] dark:border-[#262320] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5] dark:border-[#262320]">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#B9142D]" />
                <h3 className="font-heading font-black text-base text-[#171616] dark:text-[#F7F5F0]">
                  إنشاء طلب تصميم ومهمة جديدة
                </h3>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#171616] dark:text-[#F7F5F0] mb-1">عنوان المشروع/التصميم *</label>
                <input
                  type="text"
                  required
                  value={newTaskData.title_ar}
                  onChange={(e) => setNewTaskData({ ...newTaskData, title_ar: e.target.value })}
                  placeholder="مثال: تصميم دايكت علبة صلبة لمجموعة هدايا..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1C1918] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#171616] dark:text-[#F7F5F0] mb-1">اسم العميل/الجهة *</label>
                  <input
                    type="text"
                    required
                    value={newTaskData.client_name}
                    onChange={(e) => setNewTaskData({ ...newTaskData, client_name: e.target.value })}
                    placeholder="اسم الشركة أو العميل..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1C1918] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#171616] dark:text-[#F7F5F0] mb-1">رقم هاتف العميل</label>
                  <input
                    type="text"
                    value={newTaskData.client_phone}
                    onChange={(e) => setNewTaskData({ ...newTaskData, client_phone: e.target.value })}
                    placeholder="+967..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1C1918] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#171616] dark:text-[#F7F5F0] mb-1">إسناد لمصمم معين</label>
                  <select
                    value={newTaskData.designer_id}
                    onChange={(e) => setNewTaskData({ ...newTaskData, designer_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1C1918] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0]"
                  >
                    <option value="">-- بدون إسناد (قائمة الانتظار) --</option>
                    {designers.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#171616] dark:text-[#F7F5F0] mb-1">درجة الأولوية</label>
                  <select
                    value={newTaskData.priority}
                    onChange={(e) => setNewTaskData({ ...newTaskData, priority: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1C1918] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0]"
                  >
                    <option value="low">منخفضة</option>
                    <option value="normal">عادية</option>
                    <option value="high">مرتفعة</option>
                    <option value="urgent">عاجل جداً (حالة فورية)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#171616] dark:text-[#F7F5F0] mb-1">وصف واشتراطات التصميم</label>
                <textarea
                  rows={3}
                  value={newTaskData.description_ar}
                  onChange={(e) => setNewTaskData({ ...newTaskData, description_ar: e.target.value })}
                  placeholder="ملاحظات العميل، الألوان المطلوبة، نصوص المطبوعات..."
                  className="w-full p-3 rounded-xl bg-white dark:bg-[#1C1918] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#171616] dark:text-[#F7F5F0] mb-1">المقاسات وهامش القص (Bleed)</label>
                <input
                  type="text"
                  value={newTaskData.dimensions_notes}
                  onChange={(e) => setNewTaskData({ ...newTaskData, dimensions_notes: e.target.value })}
                  placeholder="مثال: 21×29.7 سم (A4) مع هامش قص 3 ملم من كل جهة..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1C1918] border border-[#E8E2D5] dark:border-[#2D2A26] text-[#171616] dark:text-[#F7F5F0]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E2D5] dark:border-[#262320] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#B9142D] text-white font-bold hover:bg-[#A01026] shadow-sm"
                >
                  إنشاء المهمة وإسنادها
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
