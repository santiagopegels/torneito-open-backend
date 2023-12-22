import { Type } from 'class-transformer';
import { IsMongoId, IsObject } from 'class-validator';
import { Category } from '../entities/category.entity';
import { CategoryDto } from './category.dto';

export class CreateCategoryDto {
  @IsMongoId()
  tournamentId: string;

  @IsObject()
  @Type(() => CategoryDto)
  category: Category;
}
