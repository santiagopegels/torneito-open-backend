import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now, ObjectId, Types } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

@Schema()
export class Tournament extends Document {
  @Prop()
  name: string;

  @Prop({
    default: now(),
  })
  startDate: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: Types.Array<Category>;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
