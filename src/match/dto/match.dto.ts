import { IsInt, IsMongoId, IsOptional } from 'class-validator';

export class MatchDto {
  @IsMongoId()
  player1: string;

  @IsMongoId()
  player2: string;

  @IsInt()
  round: number;

  @IsInt()
  matchNumber: number;

  @IsOptional()
  result: string;
}
