import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';

import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class TokenService {
  jwtSecretKey: string;
  jwtSecretRefreshKey: string;
  tokenExpireTime: string;
  tokenRefreshExpireTime: string;

  constructor() {
    this.jwtSecretKey = process.env.JWT_SECRET_KEY;
    this.jwtSecretRefreshKey = process.env.JWT_SECRET_REFRESH_KEY;
    this.tokenExpireTime = process.env.TOKEN_EXPIRE_TIME;
    this.tokenRefreshExpireTime = process.env.TOKEN_REFRESH_EXPIRE_TIME;
  }

  generateTokens(authDto: AuthDto): TokensDto {
    const jwtService = new JwtService();
    const accessToken = jwtService.sign(authDto, {
      secret: this.jwtSecretKey,
      expiresIn: this.tokenExpireTime,
    });

    const refreshToken = jwtService.sign(authDto, {
      secret: this.jwtSecretKey,
      expiresIn: this.tokenExpireTime,
    });

    return { accessToken, refreshToken };
  }
}
