import { CreateGUserInput } from './create-g-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGUserInput extends PartialType(CreateGUserInput) {
  @Field(() => Int)
  id: number;
}
