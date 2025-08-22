export interface Section {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  expires_at: string;
  created_at: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  session: Session | null;
}