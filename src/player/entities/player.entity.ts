import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema()
export class Player extends Document {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
