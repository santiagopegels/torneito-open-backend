import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    PlayerModule,
    CommonModule,
  ],
})
export class AppModule {}
