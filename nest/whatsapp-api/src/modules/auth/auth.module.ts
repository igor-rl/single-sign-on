import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwt-auth/auth.constant';
import { JwtStrategy } from './jwt-auth/jwt.strategy';
import { HttpService } from 'src/utils/http-request/http-request.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, HttpService],
  exports: [AuthService, JwtStrategy, PassportModule],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' }, // expira em 1 hora
    }),
  ],
})
export class AuthModule {}
