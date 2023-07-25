import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { KeycloakAuthDto } from './dto/keycloak-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Gerar um token de autentição com keycloak' })
  @Post('keycloak')
  async keyCloak(@Body() body: KeycloakAuthDto) {
    const access_token = await this.authService.login(body);
    console.log(access_token);
    return access_token;
  }

  @ApiOperation({ summary: 'Teste de autenticação com keycloak' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard())
  @Get('test-auth')
  test(@Req() req: any) {
    return {
      name: 'Igor Lage',
    };
  }
}
