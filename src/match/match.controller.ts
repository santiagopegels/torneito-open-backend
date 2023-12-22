import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }

  @Get('category/:categoryId')
  findAll(@Param('categoryId', ParseMongoIdPipe) categoryId: string) {
    return this.matchService.findAll(categoryId);
  }

  @Get(':matchId/category/:categoryId')
  findOne(
    @Param('matchId', ParseMongoIdPipe) matchId: string,
    @Param('categoryId', ParseMongoIdPipe) categoryId: string,
  ) {
    return this.matchService.findOne(matchId, categoryId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() createMatchDto: CreateMatchDto,
  ) {
    return this.matchService.update(id, createMatchDto);
  }

  @Delete(':matchId/category/:categoryId')
  remove(
    @Param('matchId', ParseMongoIdPipe) matchId: string,
    @Param('categoryId', ParseMongoIdPipe) categoryId: string,
  ) {
    return this.matchService.remove(matchId, categoryId);
  }
}
