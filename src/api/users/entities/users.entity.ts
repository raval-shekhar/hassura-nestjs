import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Users {
  @Field(() => ID, { description: 'id' })
  id: string;

  @Field(() => String, { description: 'first_name' })
  firstName: string;

  @Field(() => String, { description: 'last_name' })
  lastName;

  @Field(() => String, { description: 'gender' })
  gender;
}
