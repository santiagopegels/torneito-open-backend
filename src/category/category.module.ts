import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './entities/category.entity';
import { TournamentService } from 'src/tournament/tournament.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Tournament,
  TournamentSchema,
} from 'src/tournament/entities/tournament.entity';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, TournamentService],
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
  ]
})
export class CategoryModule {}
