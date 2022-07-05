import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ForbiddenError } from 'apollo-server-express';


@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('Please provide valid auth token')
    }
    if (!user['x-hasura-allowed-roles'].includes('admin')) {
      throw new ForbiddenError('You do not have permission to access this data')
    }
    return user;
  }
}
