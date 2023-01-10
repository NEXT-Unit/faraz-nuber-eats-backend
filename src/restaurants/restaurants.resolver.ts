import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant-dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant-dto';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((returns) => Boolean)
  async createRestaurant(
    @Args('input') CreateRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(CreateRestaurantDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args('input') UpdateRestaurantDto: UpdateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(UpdateRestaurantDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
