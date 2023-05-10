import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Order, OrderStatus } from "../entities/order.entity";
import { MutationOutput } from "src/common/dtos/output.dto";


@InputType()
export class GetOrdersInput{
    @Field(type => OrderStatus, {nullable:true})
    status?: OrderStatus
}

@ObjectType()
export class GetOrdersOutput extends MutationOutput{
    @Field(type=> [Order], {nullable:true})
    orders?: Order[]
}