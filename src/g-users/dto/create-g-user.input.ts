import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
