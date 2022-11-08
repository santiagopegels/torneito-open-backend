import { SupabaseClientSingleton } from './supabase-client.singleton';

export class SupabaseAdapter {
  private supabase;

  constructor() {
    this.supabase = SupabaseClientSingleton.getInstance();
  }

  async userRoles(token: string) {
    const user = await this.getUser(token);

    const { data: roles } = await this.supabase
      .from('roles')
      .select('name, users_roles!inner(*)')
      .eq('users_roles.user_id', user.id);

    const userRoles = roles.map((role) => {
      return role.name;
    });

    return userRoles;
  }

  async getUser(token: string) {
    const {
      data: { user },
    } = await this.supabase.auth.getUser(token);

    return user;
  }
}
