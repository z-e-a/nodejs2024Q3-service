import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/jwt.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/error')
  @Public()
  getError(): string {
    throw new HttpException('Testing error!', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
