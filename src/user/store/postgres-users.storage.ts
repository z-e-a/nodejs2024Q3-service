import { Injectable } from '@nestjs/common';
import { UserStore } from '../interfaces/user-storage.interface';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
class PostgresUsersStorage implements UserStore {
  constructor(private readonly prisma: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const newUser: UserEntity = (await this.prisma.user.create({
      data: { ...userDto, version: 1 },
    })) as unknown as UserEntity;
    return newUser;
  }

  async update(updateUserDto: Partial<UserDto>): Promise<UserEntity> {
    const userFromDB = await this.findById(updateUserDto.id);
    return this.prisma.user.update({
      where: { id: updateUserDto.id },
      data: {
        ...(updateUserDto as unknown as UserEntity),
        version: userFromDB.version + 1,
      },
    }) as unknown as UserEntity;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findOneByLogin(login: string): Promise<UserEntity | undefined> {
    return await this.prisma.user.findFirst({
      where: { login },
    });
  }
}

export default PostgresUsersStorage;
