import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Order } from "../entities/order.entity";
import { MutationOutput } from "src/common/dtos/output.dto";


@InputType()
export class EditOrderInput extends PickType(Order, ['id',"status"]){}

@ObjectType()
export class EditOrderOutput extends MutationOutput{}