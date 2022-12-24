import { ArgsType, Field} from "@nestjs/graphql";


@ArgsType()
export class CreateRestaurantDto{
    @Field(is => String)
    name: string;

    @Field(is => Boolean)
    isVegan: boolean;

    @Field(is => String)
    address: string;

    @Field(is => String)
    ownerName: string;
}
