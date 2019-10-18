import { UserDTO } from './../users/user.dto';
import { AuthDTO } from './auth.dto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly usersService: UsersService) { }
    @Post('login')
    login(@Body() data: AuthDTO) {
        return this.authService.signIn(data);
    }
    @Post('register')
    register(@Body() data: UserDTO) {
        return this.authService.signUp(data);
    }
    @Get(':username')
    showOneUser(@Param('username') username: string) {
        return this.usersService.findOne(username);
    }
}
