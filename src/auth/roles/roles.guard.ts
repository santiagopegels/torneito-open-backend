import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SupabaseAdapter } from '../adapters/supabase/supabase.adapter';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private supabaseAdapter;

  constructor(private reflector: Reflector) {
    this.supabaseAdapter = new SupabaseAdapter();
  }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];

    const userRoles = await this.supabaseAdapter.userRoles(token);

    return requiredRoles.some((requiredRole) =>
      userRoles.includes(requiredRole),
    );
  }
}
