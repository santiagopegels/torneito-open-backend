import { Injectable } from '@nestjs/common';
import { SupabaseAuthAdapter } from './adapters/supabase/supabase.auth.adapter';

@Injectable()
export class AuthService {
  constructor(private readonly auth: SupabaseAuthAdapter) {}
  async login({ email, password }: { email: string; password: string }) {
    return await this.auth.login(email, password);
  }

  async register({ email, password }: { email: string; password: string }) {
    return await this.auth.register(email, password);
  }
}
