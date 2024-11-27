import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserStore {
  create: (userDto: CreateUserDto) => Promise<UserEntity>;
  update: (updateUserDto: Partial<UserDto>) => Promise<UserEntity>;
  delete: (id: string) => void;
  getAll: () => Promise<UserEntity[]>;
  findById: (id: string) => Promise<UserEntity | undefined>;
  findOneByLogin: (login: string) => Promise<UserEntity | undefined>;
}
