import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tournament, TournamentSchema } from './entities/tournament.entity';
import {
  Category,
  CategorySchema,
} from 'src/category/entities/category.entity';
import { Player, PlayerSchema } from 'src/player/entities/player.entity';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Tournament.name,
        schema: TournamentSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Player.name,
        schema: PlayerSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class TournamentModule {}
