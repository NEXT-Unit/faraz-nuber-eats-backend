import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateRestaurantInput,
  CreateRestaurantOutPut,
} from './dtos/create-restaurant-dto';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantService } from './restaurants.service';
import { AuthUser } from 'src/auth/auth-user.decorators';
import { User, UserRole } from 'src/users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/auth/role.decorator';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dtos/edit-restaurant-dto';
import { EditProfileInput } from 'src/users/dtos/edit-profile.dto';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation((returns) => CreateRestaurantOutPut)
  @Role(['Owner'])
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input') CreateRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutPut> {
    return this.restaurantService.createRestaurant(
      authUser,
      CreateRestaurantInput,
    );
  }
  @Mutation((returns) => EditRestaurantOutput)
  @Role(['Owner'])
  editRestaurant(
    @AuthUser() authUser: User,
    @Args('input') editRestaurantInput: EditRestaurantInput,
  ): EditRestaurantOutput {
    return { ok: true };
  }
}
