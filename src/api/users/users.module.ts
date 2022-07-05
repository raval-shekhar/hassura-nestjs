import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      maxRedirects: 5,
      timeout: 5000,
      baseURL: process.env.HASURA_GRAPHQL_API_ENDPOINT,
    }),
  ],
  providers: [UserResolver, UserService],
})
export class UsersModule { }
