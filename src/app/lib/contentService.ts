import { supabase } from './supabaseClient';
import { Section } from '../types';

export class ContentService {
  static async getAllSections(): Promise<{ data: Section[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Get sections error:', error);
      return { data: null, error: 'حدث خطأ أثناء جلب البيانات' };
    }
  }

  static async getSectionById(id: number): Promise<{ data: Section | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Get section error:', error);
      return { data: null, error: 'حدث خطأ أثناء جلب القسم' };
    }
  }

  static async createSection(section: Omit<Section, 'id' | 'created_at'>): Promise<{ data: Section | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('sections')
        .insert(section)
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Create section error:', error);
      return { data: null, error: 'حدث خطأ أثناء إنشاء القسم' };
    }
  }

  static async updateSection(id: number, section: Partial<Section>): Promise<{ data: Section | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('sections')
        .update(section)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Update section error:', error);
      return { data: null, error: 'حدث خطأ أثناء تحديث القسم' };
    }
  }

  static async deleteSection(id: number): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('sections')
        .delete()
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Delete section error:', error);
      return { success: false, error: 'حدث خطأ أثناء حذف القسم' };
    }
  }
}