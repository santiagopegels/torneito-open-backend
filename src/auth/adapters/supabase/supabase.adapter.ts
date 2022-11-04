import { UnauthorizedException } from '@nestjs/common';
import { AuthAdapter } from '../../interfaces/auth-adapter.interface';
import { SupabaseClientSingleton } from './supabase-client.singleton';

export class SupabaseAdapter implements AuthAdapter {
  private supabase;

  constructor() {
    this.supabase = SupabaseClientSingleton.getInstance();
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new UnauthorizedException(error.message);

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    };
  }

  async register(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new UnauthorizedException(error.message);

    return data;
  }
}
