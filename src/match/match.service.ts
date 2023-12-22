import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchService {
  constructor(private readonly categoryService: CategoryService) {}

  async create({ categoryId, match }: { categoryId: string; match: Match }) {
    const matchCreated = {
      ...match,
      _id: new mongoose.Types.ObjectId(),
    };

    const category = await this.categoryService.findOne(categoryId);

    category.matches.push(matchCreated);

    category.save();

    return matchCreated;
  }

  async findAll(categoryId: string) {
    const category = await this.categoryService.findOne(categoryId);

    return category.matches;
  }

  async findOne(matchId: string, categoryId: string) {
    const category = await this.categoryService.findOne(categoryId);

    const match = category.matches.find((match) => match._id == matchId);

    return match;
  }

  async update(matchId: string, { categoryId, match }) {
    const matchUpdated = {
      ...match,
      _id: new mongoose.Types.ObjectId(matchId),
    };
    const category = await this.categoryService.findOne(categoryId);
    category.matches.pull(matchId);
    category.matches.push(matchUpdated);

    category.save();

    return { message: 'Match updated succefully' };
  }

  async remove(id: string, categoryId: string) {
    const category = await this.categoryService.findOne(categoryId);

    category.matches.pull(id);

    category.save();
    return { message: 'Match removed succefully' };
  }
}
