import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Users } from './entities/users.entity';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) { }
  findAll(limit: number, offset: number): Observable<Users[]> {
    return this.httpService
      .post(process.env.HASURA_GRAPHQL_API_ENDPOINT, {
        query: `query($limit: Int!, $offset: Int!) {
            users(limit: $limit, offset: $offset) {
              id
              first_name
              last_name
              gender
            }
        }`,
        variables: {
          limit,
          offset,
        },
      })
      .pipe(
        map((response) =>
          response.data.data?.users.map((user) => ({
            firstName: user.first_name,
            lastName: user.last_name,
            id: user.id,
            gender: user.gender,
          })),
        ),
      );
  }
}
