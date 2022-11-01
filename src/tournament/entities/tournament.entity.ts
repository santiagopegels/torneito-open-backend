import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

@Schema()
export class Tournament extends Document {
  @Prop()
  name: string;

  @Prop({
    default: now(),
  })
  startDate: Date;

  @Prop([Category])
  categories: Category[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
