import { supabase } from './supabaseClient';
import { AdminUser } from '../types';

export class ProfileService {
  static async updateProfile(
    userId: string, 
    updates: { name?: string; avatar_url?: string }
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update(updates)
        .eq('id', userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'حدث خطأ أثناء تحديث الملف الشخصي' };
    }
  }

  static async updatePassword(
    userId: string, 
    currentPassword: string, 
    newPassword: string
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const { data: user, error: fetchError } = await supabase
        .from('admin_users')
        .select('password')
        .eq('id', userId)
        .single();

      if (fetchError || !user) {
        return { success: false, error: 'المستخدم غير موجود' };
      }

      if (user.password !== currentPassword) {
        return { success: false, error: 'كلمة المرور الحالية غير صحيحة' };
      }

      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password: newPassword })
        .eq('id', userId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Update password error:', error);
      return { success: false, error: 'حدث خطأ أثناء تحديث كلمة المرور' };
    }
  }

  static async getProfile(userId: string): Promise<{ data: AdminUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Get profile error:', error);
      return { data: null, error: 'حدث خطأ أثناء جلب بيانات الملف الشخصي' };
    }
  }
}