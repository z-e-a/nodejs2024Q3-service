import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

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

  async login(authDto: AuthDto) {
    const userFromService = await this.userService.getUserByLogin(
      authDto.login,
    );

    if (!userFromService) {
      throw new HttpException(`Bad credentials`, HttpStatus.FORBIDDEN);
    }

    const isPasswordMatch = await bcrypt.compare(
      authDto.password,
      userFromService.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException(`Bad credentials`, HttpStatus.FORBIDDEN);
    }

    return this.tokenService.generateTokens(authDto);
  }
}
