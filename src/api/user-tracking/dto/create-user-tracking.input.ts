import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FindUserTracking {
  @Field(() => Int, { description: 'radius' })
  radius: number;
}
