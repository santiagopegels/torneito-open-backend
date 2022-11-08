import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { SupabaseGuard } from 'src/auth/guards/supabase.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Roles(Role.Player)
  @UseGuards(SupabaseGuard, RolesGuard)
  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.playerService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.playerService.findOne(id);
  }

  @Roles(Role.Player)
  @UseGuards(SupabaseGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playerService.update(id, updatePlayerDto);
  }

  @Roles(Role.Player)
  @UseGuards(SupabaseGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.playerService.remove(id);
  }
}
