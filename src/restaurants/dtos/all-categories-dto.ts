import { MutationOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AllCategoriesOutPut extends MutationOutput {
  @Field((type) => [Category], { nullable: true })
  categories?: Category[];
}
