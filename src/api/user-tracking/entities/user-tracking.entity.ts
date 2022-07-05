import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Users } from '../../users/entities/users.entity';

@ObjectType()
export class Location {
  @Field(() => Float, { description: 'latitude' })
  lat: number;

  @Field(() => Float, { description: 'longitude' })
  long: number;
}

@ObjectType()
export class UserTracking {
  @Field(() => Users, { description: 'user details' })
  user: Users;

  @Field(() => Location, { description: 'Geometry point' })
  location: Location;
}
