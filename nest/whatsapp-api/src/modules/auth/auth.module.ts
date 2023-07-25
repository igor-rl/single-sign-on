import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpService } from 'src/utils/http-request/http-request.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HttpService]
})
export class AuthModule {}
