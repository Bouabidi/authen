import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}
