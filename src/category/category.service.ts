import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import arrayWithUniqueElements from 'src/common/utils/array-unique-elements';
import { Player, PlayerSchema } from 'src/player/entities/player.entity';
import { TournamentService } from 'src/tournament/tournament.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    private readonly tournamentService: TournamentService,
  ) {}
  async create({ tournamentId, category }: CreateCategoryDto) {
    const categoryToSave = {
      category,
      players: arrayWithUniqueElements<Player>(category.players),
    };

    const categoryCreated = await this.categoryModel.create(categoryToSave);
    this.tournamentService.addCategory(tournamentId, categoryCreated._id);
    return categoryCreated;
  }

  findAll({ limit = 20, offset = 0 }: PaginationDto) {
    return this.categoryModel.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findOne({ _id: id });

    if (!category)
      throw new BadRequestException(`The category does not exists`);

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    try {
      await category.updateOne(updateCategoryDto);

      return { ...category.toJSON(), ...updateCategoryDto };
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string, tournamentId: string) {
    const { deletedCount } = await this.categoryModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Category with id "${id}" not found`);

    this.tournamentService.removeCategory(tournamentId, id);

    return;
  }

  async addPlayer(id: string, playerId: string) {
    const category = await this.categoryModel.findOne({ _id: id });

    const player: Player = category.players.find(
      (player) => player._id == playerId,
    );

    if (player)
      throw new BadRequestException(`The player exists in the category`);

    category.players.push(playerId);

    category.save();

    return { message: 'Player added succefully' };
  }

  async removePlayer(id: string, playerId: string) {
    const category = await this.categoryModel.findOne({ _id: id });
    category.players.pull(playerId);
    category.save();
    return { message: 'Player removed succefully' };
  }
}
