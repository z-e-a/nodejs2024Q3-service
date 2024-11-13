import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStore } from './interfaces/user-storage.interface';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserStore')
    private readonly storage: UserStore,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = { ...this.storage.create(createUserDto) };
    delete createdUser['password'];
    return createdUser;
  }

  update(id: string, updateUserDto: Partial<UserDto>) {
    const updatedUser = { ...this.storage.update({ id, ...updateUserDto }) };
    delete updatedUser['password'];
    return updatedUser;
  }

  remove(id: string) {
    this.storage.delete(id);
  }

  findAll() {
    return this.storage.getAll();
  }

  findOne(id: string): UserDto | undefined {
    const userFromStore = this.storage.findById(id) as UserDto;
    if (!userFromStore) {
      return undefined;
    }
    const userForResponse = { ...userFromStore };
    delete userForResponse['password'];
    return userForResponse;
  }

  getUserPassword(id: string) {
    return (this.storage.findById(id) as UserDto).password;
  }

  setUserPassword(id: string, newPassword: string) {
    return this.update(id, { password: newPassword });
  }
}
