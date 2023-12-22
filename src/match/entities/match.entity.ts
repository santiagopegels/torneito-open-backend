import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Player } from 'src/player/entities/player.entity';

@Schema()
export class Match {
  @Prop()
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Player' })
  player1: Player;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Player' })
  player2: Player;

  @Prop()
  round: number;

  @Prop()
  matchNumber: number;

  @Prop()
  result: string;
}
