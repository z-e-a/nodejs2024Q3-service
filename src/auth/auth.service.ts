import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(authDto: AuthDto) {
    const userFromService = await this.userService.getUserByLogin(
      authDto.login,
    );

    if (userFromService) {
      throw new HttpException(
        `User ${authDto.login} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    return this.userService.create({
      login: authDto.login,
      password: bcrypt.hashSync(
        authDto.password,
        parseInt(process.env.CRYPT_SALT),
      ),
    });
  }
}
