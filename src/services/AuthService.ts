import { supabase } from './supabase';

export class AuthService {
  public static async registrar(email: string, pass: string) {
    const { data, error } = await supabase.auth.signUp({ email, password: pass });
    if (error) throw error;
    return data;
  }

  public static async login(email: string, pass: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
    return data;
  }

  public static async logout() {
    await supabase.auth.signOut();
  }
}