import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { IsString, IsBoolean } from 'class-validator';
import { Restaurant } from '../entities/restaurants.entity';

@InputType()
export class CreateRestaurantDto extends OmitType(
  Restaurant,
  ['id'],
  InputType,
) {}
