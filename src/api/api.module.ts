import { Module } from '@nestjs/common';
import { UserTrackingModule } from './user-tracking/user-tracking.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, UserTrackingModule],
  exports: [UsersModule, UserTrackingModule],
})
export class ApiModule { }
