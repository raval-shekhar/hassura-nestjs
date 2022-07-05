import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UserTrackingService } from './user-tracking.service';
import { UserTrackingResolver } from './user-tracking.resolver';

@Module({
  imports: [
    HttpModule.register({
      maxRedirects: 5,
      timeout: 5000,
      baseURL: process.env.HASURA_GRAPHQL_API_ENDPOINT,
    }),
  ],
  providers: [UserTrackingResolver, UserTrackingService],
})
export class UserTrackingModule { }
