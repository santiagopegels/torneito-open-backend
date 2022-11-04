import { Injectable } from '@nestjs/common';
import { SupabaseAdapter } from './adapters/supabase/supabase.adapter';

@Injectable()
export class AuthService {
  constructor(private readonly auth: SupabaseAdapter) {}
  async login({ email, password }: { email: string; password: string }) {
    return await this.auth.login(email, password);
  }

  async register({ email, password }: { email: string; password: string }) {
    return await this.auth.register(email, password);
  }
}
