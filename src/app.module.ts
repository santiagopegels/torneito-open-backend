import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/torneito'),
    PlayerModule,
    CommonModule,
  ],
})
export class AppModule {}
