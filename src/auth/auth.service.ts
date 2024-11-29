import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { RefreshAuthDto } from './dto/refresh.dto';
import { TokenDto } from 'src/token/dto/token.dto';

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
    const userFromService: UserEntity = await this.userService.getUserByLogin(
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

    return this.tokenService.generateTokens({
      userId: userFromService.id,
      login: userFromService.login,
    });
  }

  async refreshToken(refreshAuthDto: RefreshAuthDto) {
    let tokenDto: TokenDto;
    try {
      tokenDto = await this.tokenService.checkToken(
        refreshAuthDto.refreshToken,
      );
    } catch {
      throw new HttpException(
        `Refresh token is invalid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tokenService.generateTokens({
      userId: tokenDto.userId,
      login: tokenDto.login,
    });
  }
}
