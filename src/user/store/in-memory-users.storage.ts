import { Injectable } from '@nestjs/common';
import { UserStore } from '../interfaces/user-storage.interface';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UserDto } from '../dto/user.dto';

@Injectable()
class InMemoryUsersStorage implements UserStore {
  private records: UserEntity[] = [];

  create(userDto: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      ...userDto,
      id: randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.records.push(newUser);
    return newUser;
  }

  update(updateUserDto: Partial<UserDto>): UserEntity {
    this.records = this.records.map((user) => {
      if (user.id === updateUserDto.id) {
        return Object.assign(user, {
          ...updateUserDto,
          version: user.version + 1,
          updatedAt: Date.now(),
        });
      }
      return user;
    });
    return this.findById(updateUserDto.id);
  }

  delete(id: string): void {
    this.records = this.records.filter((record) => record.id !== id);
  }

  getAll(): UserEntity[] {
    return this.records;
  }

  findById(id: string): UserEntity | undefined {
    return this.records.find((record) => record.id == id);
  }
}

export default InMemoryUsersStorage;
