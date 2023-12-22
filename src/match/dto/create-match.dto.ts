import { Type } from 'class-transformer';
import { IsMongoId, IsObject, ValidateNested } from 'class-validator';
import { Match } from '../entities/match.entity';
import { MatchDto } from './match.dto';

export class CreateMatchDto {
  @IsMongoId()
  categoryId: string;

  @IsObject()
  @Type(() => MatchDto)
  @ValidateNested()
  match: Match;
}
