import { Global, Module } from '@nestjs/common';
import { HttpService } from './http-request.service';

@Global()
@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class YourModule {}