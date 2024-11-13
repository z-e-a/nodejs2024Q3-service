import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import InMemoryUsersStorage from './store/in-memory-users.storage';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserStore',
      useClass: InMemoryUsersStorage,
    },
  ],
})
export class UserModule {}
