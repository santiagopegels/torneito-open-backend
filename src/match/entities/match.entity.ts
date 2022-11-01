import { Prop, Schema } from '@nestjs/mongoose';
import { Player } from 'src/player/entities/player.entity';

const TYPE = ['Single', 'Doble'];

@Schema()
export class Match {
  @Prop()
  player1: Player;

  @Prop()
  player2: Player;

  @Prop()
  player3: Player;

  @Prop()
  player4: Player;

  @Prop()
  result: string;

  @Prop()
  type: string;

  public static type = () => TYPE;
}
