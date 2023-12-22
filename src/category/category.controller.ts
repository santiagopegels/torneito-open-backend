import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategory: CreateCategoryDto) {
    return this.categoryService.create(createCategory);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoryService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updatePlayerDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updatePlayerDto);
  }

  @Delete(':categoryId/tournament/:tournamentId')
  remove(
    @Param('categoryId', ParseMongoIdPipe) categoryId: string,
    @Param('tournamentId', ParseMongoIdPipe) tournamentId: string,
  ) {
    return this.categoryService.remove(categoryId, tournamentId);
  }

  @Patch(':categoryId/add-player/:playerId')
  addPlayer(
    @Param('categoryId', ParseMongoIdPipe) categoryId: string,
    @Param('playerId', ParseMongoIdPipe) playerId: string,
  ) {
    return this.categoryService.addPlayer(categoryId, playerId);
  }

  @Patch(':categoryId/remove-player/:playerId')
  removePlayer(
    @Param('categoryId', ParseMongoIdPipe) categoryId: string,
    @Param('playerId', ParseMongoIdPipe) playerId: string,
  ) {
    return this.categoryService.addPlayer(categoryId, playerId);
  }
}
