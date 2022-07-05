import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field(() => Int, { description: 'limit' })
  limit: number;

  @Field(() => Int, { description: 'offset' })
  offset: number;
}
