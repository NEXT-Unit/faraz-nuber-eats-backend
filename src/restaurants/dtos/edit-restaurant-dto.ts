import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurants.entity';
import { CreateRestaurantInput } from './create-restaurant-dto';
import { MutationOutput } from 'src/common/dtos/output.dto';

@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field((type) => Number)
  restaurantId: number;
}

@ObjectType()
export class EditRestaurantOutput extends MutationOutput {}
