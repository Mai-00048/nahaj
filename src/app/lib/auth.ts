import { supabase } from './supabaseClient';
import { AdminUser, Session } from '../types';

export class AuthService {
  static async login(email: string, password: string): Promise<{ user: AdminUser | null; session: Session | null; error: string | null }> {
    try {
      const { data: user, error: userError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (userError || !user) {
        return { user: null, session: null, error: 'Email or password is incorrect' };
      }

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .insert({
          user_id: user.id,
          expires_at: expiresAt.toISOString(),
        })
        .select()
        .single();

      if (sessionError) {
        return { user: null, session: null, error: 'Error creating session' };
      }

      return { user, session, error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { user: null, session: null, error: 'Unexpected error occurred' };
    }
  }

  static async validateSession(sessionId: string): Promise<{ user: AdminUser | null; valid: boolean }> {
    try {
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (sessionError || !session) {
        return { user: null, valid: false };
      }

      const { data: user, error: userError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', session.user_id)
        .single();

      if (userError || !user) {
        return { user: null, valid: false };
      }

      return { user, valid: true };
    } catch (error) {
      console.error('Session validation error:', error);
      return { user: null, valid: false };
    }
  }

  static async logout(sessionId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', sessionId);

      return !error;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }

  static async changePassword(
  email: string,
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; error: string | null }> {
  try {
     const { data: user, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('password', oldPassword)
      .single();

    if (userError || !user) {
      return { success: false, error: 'Old password is incorrect' };
    }

    const { error: updateError } = await supabase
      .from('admin_users')
      .update({ password: newPassword })
      .eq('id', user.id);

    if (updateError) {
      return { success: false, error: 'Error updating password' };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Change password error:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

}