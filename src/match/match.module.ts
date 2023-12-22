import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
} from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { TournamentService } from 'src/tournament/tournament.service';
import { Tournament, TournamentSchema } from 'src/tournament/entities/tournament.entity';

@Module({
  controllers: [MatchController],
  providers: [MatchService, CategoryService, TournamentService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Tournament.name,
        schema: TournamentSchema,
      },
    ]),
  ],
})
export class MatchModule {}
