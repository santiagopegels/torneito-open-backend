import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectModel(Tournament.name)
    private readonly tournamentModel: Model<Tournament>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto) {
    try {
      const tournament = await this.tournamentModel.create(createTournamentDto);
      return tournament;
    } catch (error) {
      console.log(error);
    }
  }

  findAll({ limit = 20, offset = 0 }: PaginationDto) {
    return this.tournamentModel.find({},{"categories": 0}).limit(limit).skip(offset);
  }

  findOne(id: string) {
    return this.tournamentModel
      .findOne({ _id: id })
      .populate({ path: 'categories', populate: { path: 'players' } });
  }

  async update(id: string, updateTournamentDto: UpdateTournamentDto) {
    const tournement = await this.findOne(id);

    try {
      await tournement.updateOne(updateTournamentDto);

      return { ...tournement.toJSON(), ...updateTournamentDto };
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.tournamentModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Tournament with id "${id}" not found`);

    return;
  }

  async addCategory(id: string, categoryId: string) {
    const tournament = await this.tournamentModel.findOne({ _id: id });
    tournament.categories.push(categoryId);

    return tournament.save();
  }

  async removeCategory(id: string, categoryId: string) {
    const tournament = await this.tournamentModel.findOne({ _id: id });
    tournament.categories.pull(categoryId);

    return tournament.save();
  }
}
