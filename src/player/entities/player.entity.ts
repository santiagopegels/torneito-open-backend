import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Player extends Document {
  @Prop()
  name: string;
  @Prop()
  lastName: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
