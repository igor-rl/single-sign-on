import { Inject, Injectable } from '@nestjs/common';
import { KeycloakAuthDto } from './dto/keycloak-auth.dto';
import { HttpService } from 'src/utils/http-request/http-request.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(HttpService)
    private http: HttpService,
  ) {}
  async login({ login, senha }: KeycloakAuthDto): Promise<any> {
    console.log('Autenticação pelo keycloak');
    try {
      const data = await this.http.post(
        `http://keycloak:8080/realms/storage-app-realm/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: 'whatsapp-api-client',
          client_secret: 'C4o6aozEUR9mraJPWZQkB7kmUTwwidKh',
          username: 'sistema@storage.app.br',
          password: 'senha',
          grant_type: 'password',
          scope: 'openid'
        }),
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

}
