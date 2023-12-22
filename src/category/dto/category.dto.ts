import { Type } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMatchDto } from 'src/match/dto/create-match.dto';
import { Match } from 'src/match/entities/match.entity';
import { Player } from 'src/player/entities/player.entity';
import { Category } from '../entities/category.entity';

export class CategoryDto {
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
  @ValidateNested({ each: true })
  @Type(() => CreateMatchDto)
  matches: Match[];
}
