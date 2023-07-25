import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { HttpService } from './utils/http-request/http-request.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: process.env.INSTANCE_HOST,
          port: process.env.DB_PORT,
          database: process.env.DB_NAME,
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          entities: [__dirname + '/**/*entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          subscribes: [__dirname + '/subscribs/*{.ts,.js}'],
          extra: {
            charset: 'utf8mb4_unicode_ci',
          },
          synchronize: false,
          logging: false
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }