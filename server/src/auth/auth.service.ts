import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO, UserRO } from 'src/users/user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async signIn(data: any) {
        const user = await this.usersService.findOne(data.username);
        if (!user || !(await user.comparePassword(data.password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = { username: user.username, password: user.password };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async signUp(data: UserDTO): Promise<UserRO> {
        const exists = await this.usersService.exists(data);
        if (exists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const user = await this.usersService.create(data);
        await this.usersService.save(user);
        return user;
    }
}
