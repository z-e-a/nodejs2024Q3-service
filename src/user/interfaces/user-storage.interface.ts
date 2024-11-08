import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserStore {
  create: (userDto: CreateUserDto) => UserEntity;
  update: (updateUserDto: Partial<UserDto>) => UserEntity;
  delete: (id: string) => void;
  getAll: () => UserEntity[];
  findById: (id: string) => UserEntity | undefined;
}
