import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserTrackingService } from './user-tracking.service';
import { UserTracking } from './entities/user-tracking.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../shared/guard/jwt.guard';

@Resolver(() => UserTracking)
@UseGuards(GqlJwtAuthGuard)
export class UserTrackingResolver {
  constructor(private readonly userTrackingService: UserTrackingService) { }

  @Query(() => [UserTracking], { name: 'userTracking' })
  findAll(@Args('radius', { type: () => Int }) radius: number) {
    return this.userTrackingService.findAll(radius, [23.2009, 72.5470]);
  }
}
