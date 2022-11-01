import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    return this.tournamentModel
      .find({
        take: limit,
        skip: offset,
      })
      .populate({ path: 'categories', populate: { path: 'players' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} tournament`;
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return `This action updates a #${id} tournament`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournament`;
  }
}
