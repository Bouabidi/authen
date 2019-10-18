import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { isNil } from 'lodash';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>){}
    async exists(data: UserDTO): Promise<boolean> {
        const { username } = data;
        const user = await this.userRepository.findOne({
            where: [
                { username },
            ],
        });
        return !isNil(user);
    }
    async findOne(username: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { username },
        });
    }
    async create(data: UserDTO): Promise<UserEntity> {
        return await this.userRepository.create(data);
    }
    async save(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }
}
