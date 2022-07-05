import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from '../../shared/guard/jwt.guard';
import { UserInput } from './dto/users.input';
import { Users } from './entities/users.entity';
import { UserService } from './users.service';

@Resolver(() => Users)
@UseGuards(GqlJwtAuthGuard)
export class UserResolver {
  constructor(private readonly userTrackingService: UserService) { }

  @Query(() => [Users], { name: 'listUsers' })
  async findAll(@Args('userInput') data: UserInput) {
    return this.userTrackingService.findAll(data.limit, data.offset);
  }
}
