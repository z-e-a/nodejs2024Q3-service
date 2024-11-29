import { Body, HttpCode, HttpStatus, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './jwt.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() authDto: AuthDto) {
    return await this.authService.signUp(authDto);
  }

  @Post('login')
  @Public()
  async login(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }
}
