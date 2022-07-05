import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { UserTracking } from './entities/user-tracking.entity';

@Injectable()
export class UserTrackingService {
  constructor(private readonly httpService: HttpService) { }

  findAll(radius: number, coordinates: number[]): Observable<UserTracking[]> {
    return this.httpService
      .post(process.env.HASURA_GRAPHQL_API_ENDPOINT, {
        query: `query ($radius: Float!, $coordinates: [Float!]) {
            user_trackings(where: {
              location: {
                _st_d_within: {
                  distance: $radius,
                 	from: {
                    type: "Point",
                    coordinates: $coordinates
                  }
                }
              }
            }) {
              location
              user {
                id
                first_name
                last_name
                gender
              }
            }
          }
        `,
        variables: {
          radius,
          coordinates,
        },
      })
      .pipe(
        map((response) => {
          return response.data.data?.user_trackings.map((user) => {
            return {
              user: {
                firstName: user.user.first_name,
                lastName: user.user.last_name,
                id: user.user.id,
                gender: user.user.gender,
              },
              location: {
                lat: user.location.coordinates[0],
                long: user.location.coordinates[1],
              },
            };
          });
        }),
      );
  }
}
