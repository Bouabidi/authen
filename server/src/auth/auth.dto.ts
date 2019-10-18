import { IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

// tslint:disable-next-line:max-classes-per-file
export class AuthRO {
  username: string;
  token?: string;
  expiresIn?: string;
}