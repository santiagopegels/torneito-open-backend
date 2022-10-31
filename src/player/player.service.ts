import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name)
    private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    try {
      const player = await this.playerModel.create(createPlayerDto);
      return player;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't create - Check server logs`,
      );
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 20, offset = 0 } = paginationDto;

    return this.playerModel.find();
  }

  async findOne(id: string) {
    const player = await this.playerModel.findOne({ _id: id });

    return player;
  }

  async search(term: string) {
    const player = await this.playerModel.findOne({ name: term.trim() });

    return player;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    const player = await this.findOne(id);

    try {
      await player.updateOne(updatePlayerDto);

      return { ...player.toJSON(), ...updatePlayerDto };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Can't update - Check server logs`,
      );
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.playerModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);

    return;
  }
}
