import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Plus, Trash2, Shield, UserCheck, UserPlus, AlertCircle } from 'lucide-react';
import { UserRole } from '../../types';

export const AdminUsersManager: React.FC = () => {
  const { users, currentUser, addUser, deleteUser } = useApp();

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('sales');
  const [showAddModal, setShowAddModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    setErrorMsg('');
    try {
      await addUser({
        name: newUserName,
        email: newUserEmail,
        phone: newUserPhone,
        role: newUserRole,
      });

      setNewUserName('');
      setNewUserEmail('');
      setNewUserPhone('');
      setShowAddModal(false);
    } catch (error: any) {
      setErrorMsg(error?.message || 'تعذر دعوة المستخدم عبر Supabase Auth.');
    }
  };

  const handleDelete = async (userId: string) => {
    setErrorMsg('');
    try {
      const success = await deleteUser(userId);
      if (!success) {
        setErrorMsg('لا يمكن حذف هذا المستخدم أو الحساب الحالي.');
        setTimeout(() => setErrorMsg(''), 4000);
      }
    } catch (error: any) {
      setErrorMsg(error?.message || 'تعذر حذف المستخدم.');
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'owner':
        return <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">المالك / المدير العام</span>;
      case 'admin':
        return <span className="bg-brand-primary-15 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded border border-brand-primary/30">مدير العمليات</span>;
      case 'editor':
        return <span className="bg-[#FAF7F2] dark:bg-[#252222] text-[#171616] dark:text-white text-[10px] font-bold px-2 py-0.5 rounded border border-[#E7E0D3] dark:border-[#332F2F]">محرر الكتالوج</span>;
      case 'sales':
        return <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/20">مسؤول عروض الأسعار</span>;
      case 'designer':
        return <span className="bg-violet-500/10 text-violet-600 dark:text-violet-300 text-[10px] font-bold px-2 py-0.5 rounded border border-violet-500/20">مصمم</span>;
    }
  };

  return (
    <div className="space-y-6 text-right pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[#B9142D]" />
            <span>المستخدمون وإدارة الصلاحيات (Roles & Access)</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
            تعيين الأدوار والصلاحيات (Owner, Admin, Editor, Sales) وحماية حسابات الإدارة
          </p>
        </div>

        {currentUser.role === 'owner' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#B9142D] hover:bg-[#930F23] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ إضافة مستخدم جديد</span>
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-900 rounded-xl text-red-800 dark:text-red-300 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead>
              <tr className="bg-[#FAF7F2] dark:bg-[#221F1F] border-b border-[#E7E0D3] dark:border-[#332F2F] text-[#78716C] dark:text-[#A8A29E]">
                <th className="p-3 font-bold">المستخدم</th>
                <th className="p-3 font-bold">البريد الإلكتروني</th>
                <th className="p-3 font-bold">رقم الهاتف</th>
                <th className="p-3 font-bold">الدور والصلاحية</th>
                <th className="p-3 font-bold text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F1E9] dark:divide-[#252222]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#FAF7F2] dark:hover:bg-[#252222]/50">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F] flex items-center justify-center font-bold text-[#B9142D]">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[#171616] dark:text-white">{u.name}</div>
                        {u.id === currentUser.id && (
                          <span className="text-[10px] text-emerald-600 font-bold">(أنت حالياً)</span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="p-3 text-[#57534E] dark:text-[#D6D3D1] font-mono">{u.email}</td>
                  <td className="p-3 text-[#57534E] dark:text-[#D6D3D1] font-mono">{u.phone || '—'}</td>
                  <td className="p-3">{getRoleBadge(u.role)}</td>

                  <td className="p-3 text-center">
                    {u.isOwnerProtected ? (
                      <span className="text-[10px] text-[#78716C] font-semibold flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3 text-[#B9142D]" />
                        محمي (المالك)
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950"
                        title="حذف المستخدم"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs">
          <form
            onSubmit={handleCreateUser}
            className="w-full max-w-md bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-5 space-y-3.5 text-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E0D3]">
              <h3 className="font-heading font-bold text-sm">دعوة / إضافة مستخدم جديد</h3>
              <button type="button" onClick={() => setShowAddModal(false)}>إلغاء</button>
            </div>

            <div className="space-y-1">
              <label className="font-bold">اسم المستخدم الكامل:</label>
              <input
                type="text"
                required
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="مثال: صالح أحمد"
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold">البريد الإلكتروني:</label>
              <input
                type="email"
                required
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="user@rawaj.com"
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold">رقم الهاتف / واتساب:</label>
              <input
                type="tel"
                value={newUserPhone}
                onChange={(e) => setNewUserPhone(e.target.value)}
                placeholder="772110131"
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold">الدور والصلاحية في رواج:</label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                className="w-full bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] rounded px-2.5 py-1.5 font-bold"
              >
                <option value="sales">مسؤول عروض الأسعار (Sales - استقبال وتحديث عروض السعر)</option>
                <option value="designer">مصمم (Designer - المهام والبروفات المسندة إليه)</option>
                <option value="editor">محرر الكتالوج (Editor - إضافة وتعديل الخدمات والمواصفات)</option>
                <option value="admin">مدير العمليات (Admin - صلاحيات تشغيلية وإدارية)</option>
                <option value="owner">مالك / مدير عام (Owner - صلاحيات كاملة)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E7E0D3]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 rounded-lg bg-[#FAF7F2]"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-[#B9142D] text-white font-bold px-4 py-1.5 rounded-lg"
              >
                إضافة المستخدم
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
