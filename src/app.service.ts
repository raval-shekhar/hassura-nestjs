import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) { }

  async generateJwt(): Promise<string> {
    const payload = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['admin'],
        'x-hasura-default-role': 'admin',
      },
    };
    return this.jwtService.signAsync(payload);
  }
}