import { Injectable } from '@nestjs/common';
import { UserStore } from '../interfaces/user-storage.interface';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UserDto } from '../dto/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
class PostgresUsersStorage implements UserStore {
  constructor(private readonly prisma: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    // const newUser: UserEntity = {
    //   ...userDto,
    //   id: randomUUID(),
    //   version: 1,
    //   createdAt: Date.now(),
    //   updatedAt: Date.now(),
    // };
    // this.records.push(newUser);
    const newUser: UserEntity = (await this.prisma.user.create({
      data: { ...userDto, version: 1 },
      // select: fields,
      // include: relations,
    })) as unknown as UserEntity;
    return newUser;
  }

  async update(updateUserDto: Partial<UserDto>): Promise<UserEntity> {
    // this.records = this.records.map((user) => {
    //   if (user.id === updateUserDto.id) {
    //     return Object.assign(user, {
    //       ...updateUserDto,
    //       version: user.version + 1,
    //       updatedAt: Date.now(),
    //     });
    //   }
    //   return user;
    // });
    // return this.findById(updateUserDto.id);
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
    // this.records = this.records.filter((record) => record.id !== id);
    await this.prisma.user.delete({
      where: { id },
    });
  }

  // async getAll(): UserEntity[] {
  async getAll(): Promise<UserEntity[]> {
    // return this.records;
    // return await this.prisma.user.findMany();
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    // return this.records.find((record) => record.id == id);
    // return undefined;
    // records.find((record) => record.id == id);
    // return this.prisma.user.findUnique({
    //   where: { id },
    // }) as unknown as UserEntity;

    // const userFromDB = 
    // this.prisma.user
    //   .findUnique({
    //     where: { id },
    //   })
    //   .then((user) => {
    //     return user;
    //   });
    // console.log('userFromDB', userFromDB);

    // return userFromDB as unknown as UserEntity;
    // return undefined;

    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}

export default PostgresUsersStorage;
