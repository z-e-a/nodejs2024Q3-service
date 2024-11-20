import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import PostgresUsersStorage from './store/postgres-users.storage';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserStore',
      useClass: PostgresUsersStorage,
    },
    PrismaService,
  ],
})
export class UserModule {}
