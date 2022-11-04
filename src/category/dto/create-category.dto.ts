import {
  IsDefined,
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Match } from 'src/match/entities/match.entity';
import { Player } from 'src/player/entities/player.entity';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
  @IsString()
  @IsDefined()
  @IsIn(Category.years())
  year: string;

  @IsString()
  @IsDefined()
  @IsIn(Category.levels())
  level: string;

  @IsOptional()
  @IsMongoId({ each: true })
  players: Player[];

  @IsOptional()
  @IsMongoId({ each: true })
  matches: Match[];
}
