import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant-dto";
import { Restaurant } from "./entities/restaurants.entity";

@Resolver(of => Restaurant)
export class RestaurantResolver{
    @Query(returns => [Restaurant])
    restaurants(@Args('veganOnly') veganOnly:Boolean): Restaurant[]{
        return [];
    }
    
    @Mutation(returns => Boolean)
        createRestaurant(
            @Args() CreateRestaurantDto:CreateRestaurantDto,
        ): boolean {
            return true;
        } 
}