import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseAdapter } from './adapters/supabase/supabase.adapter';
import { SupabaseAuthAdapter } from './adapters/supabase/supabase.auth.adapter';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseGuard } from './guards/supabase.guard';
import { SupabaseStrategy } from './strategies/passport-supabase.strategy';

@Module({
  imports: [ConfigModule],
  providers: [
    AuthService,
    SupabaseStrategy,
    SupabaseGuard,
    SupabaseAuthAdapter,
    SupabaseAdapter,
  ],
  exports: [SupabaseGuard],
  controllers: [AuthController],
})
export class AuthModule {}
