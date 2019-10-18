import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, PassportModule.register({defaultStrategy: 'jwt', session: false}),
            TypeOrmModule.forFeature([UserEntity]),
            JwtModule.register({
              secret: jwtConstants.secret,
              signOptions: { expiresIn: '60s' },
            })],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  controllers: [AuthController]
})
export class AuthModule { }
