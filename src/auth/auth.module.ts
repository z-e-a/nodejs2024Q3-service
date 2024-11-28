import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [UserModule, TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
