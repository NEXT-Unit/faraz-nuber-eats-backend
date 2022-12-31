import { ArgsType, Field} from "@nestjs/graphql";
import { IsString, IsBoolean } from "class-validator";


@ArgsType()
export class CreateRestaurantDto{

    @IsString()
    @Field(type => String)
    name: string;

    @IsBoolean()
    @Field(type => Boolean)
    isVegan: boolean;

    @IsString()
    @Field(type => String)
    address: string;

    @IsString()
    @Field(type => String)
    ownerName: string;
}
