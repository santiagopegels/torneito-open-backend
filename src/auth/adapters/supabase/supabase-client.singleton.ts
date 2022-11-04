import { createClient } from '@supabase/supabase-js';

export class SupabaseClientSingleton {
  private static client;

  public static getInstance() {
    if (this.client) {
      return this.client;
    }

    this.client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );

    return this.client;
  }
}
