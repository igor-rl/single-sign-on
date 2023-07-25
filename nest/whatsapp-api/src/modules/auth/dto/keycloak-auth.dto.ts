import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class KeycloakAuthDto {
  @ApiProperty({
    type: String,
    description: 'login do usuário',
  })
  @IsNotEmpty()
  readonly login: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'senha de acesso',
  })
  readonly senha: string;
}
