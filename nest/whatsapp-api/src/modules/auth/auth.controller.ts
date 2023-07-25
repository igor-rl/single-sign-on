import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { KeycloakAuthDto } from './dto/keycloak-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Gerar um token de autentição com keycloak' })
  @Post('keycloak')
  async keyCloak(@Body() body: KeycloakAuthDto) {
    const access_token = await await this.authService.login(body);
    console.log(access_token);
    return access_token;
  }
}
