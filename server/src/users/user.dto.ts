import { IsNotEmpty } from 'class-validator';
import { UserEntity } from './user.entity';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

}

// tslint:disable-next-line:max-classes-per-file
export class UserRO {
  id: string;
  username: string;
  token?: string;
}