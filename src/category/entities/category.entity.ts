import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Player } from 'src/player/entities/player.entity';

const YEARS = ['Libre', '30', '35', '40', '45', '50'];
const LEVELS = ['A', 'B', 'C', 'D'];
@Schema()
export class Category extends Document {
  @Prop()
  year: string;

  @Prop()
  level: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }] })
  players: Player[];

  public static years = () => YEARS;
  public static levels = () => LEVELS;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
