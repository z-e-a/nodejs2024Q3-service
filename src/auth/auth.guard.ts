import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from 'src/token/token.service';
import { IS_PUBLIC_KEY } from './jwt.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type != 'Bearer' || !token) {
      throw new HttpException(
        `Wrong authorization type or token absence`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      await this.tokenService.checkAccessToken(token);
    } catch {
      throw new HttpException(
        `Access token is invalid`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
