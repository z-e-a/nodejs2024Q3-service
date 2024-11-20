import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStore } from './interfaces/user-storage.interface';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserStore')
    private readonly storage: UserStore,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // const createdUser = { ...this.storage.create(createUserDto) };
    // delete createdUser['password'];
    const { password, ...createdUser } = await this.storage.create(
      createUserDto,
    );
    console.log(password);
    console.log(createdUser);
    // return createdUser;
    return {
      ...createdUser,
      createdAt: createdUser.createdAt.getTime(),
      updatedAt: createdUser.updatedAt.getTime(),
    };
  }

  async update(id: string, updateUserDto: Partial<UserDto>) {
    const updatedUser = {
      ...(await this.storage.update({ id, ...updateUserDto })),
    };
    delete updatedUser['password'];
    // return updatedUser;
    return {
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
  }

  async remove(id: string) {
    await this.storage.delete(id);
  }

  async findAll() {
    // return this.storage.getAll();
    return (await this.storage.getAll()).map((user) => ({
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    }));
  }

  async findOne(id: string): Promise<UserDto | undefined> {
    const userFromStore = (await this.storage.findById(
      id,
    )) as unknown as UserEntity;
    console.log('User from store:', userFromStore);

    if (!userFromStore) {
      return undefined;
    }
    const userForResponse = { ...userFromStore };
    delete userForResponse['password'];
    // return userForResponse;
    return {
      ...userForResponse,
      createdAt: userForResponse.createdAt.getTime(),
      updatedAt: userForResponse.updatedAt.getTime(),
    };
  }

  async getUserPassword(id: string) {
    // return (this.storage.findById(id) as unknown as UserDto).password;
    // return (this.storage.findById(id) as unknown as UserEntity).password;
    // const userFromStorage = this.storage.findById(id);
    // const userFromStorage = {
    //   ...(this.storage.findById(id) as unknown as UserEntity),
    // };
    const userFromStorage = (await this.storage.findById(
      id,
    )) as unknown as UserEntity;
    // console.log('userFromStorage', userFromStorage);
    if (!userFromStorage) {
      return undefined;
    }
    return userFromStorage?.password;
  }

  setUserPassword(id: string, newPassword: string) {
    return this.update(id, { password: newPassword });
  }
}
