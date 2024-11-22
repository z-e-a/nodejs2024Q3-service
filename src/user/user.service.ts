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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...createdUser } = await this.storage.create(
      createUserDto,
    );
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
    if (!userFromStore) {
      return undefined;
    }
    const userForResponse = { ...userFromStore };
    delete userForResponse['password'];
    return {
      ...userForResponse,
      createdAt: userForResponse.createdAt.getTime(),
      updatedAt: userForResponse.updatedAt.getTime(),
    };
  }

  async getUserPassword(id: string) {
    const userFromStorage = (await this.storage.findById(
      id,
    )) as unknown as UserEntity;
    if (!userFromStorage) {
      return undefined;
    }
    return userFromStorage?.password;
  }

  setUserPassword(id: string, newPassword: string) {
    return this.update(id, { password: newPassword });
  }
}
