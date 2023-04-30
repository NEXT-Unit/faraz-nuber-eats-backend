import {
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurants.entity';
import { MutationOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'coverImage',
  'address',
]) {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends MutationOutput {
  @Field((type) => Int)
  restaurantId?: number;
}
