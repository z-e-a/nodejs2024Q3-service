import { Module } from '@nestjs/common';
import { CustomHttpExceptionFilter } from './custom-http-exception.filter';
import { CustomLoggerModule } from 'src/logger/logger.module';
import { CustomLogger } from 'src/logger/customLogger.service';

@Module({
  providers: [
    CustomHttpExceptionFilter,
    {
      provide: 'LoggerService ',
      useClass: CustomLogger,
    },
  ],
  exports: [CustomHttpExceptionFilter],
  imports: [CustomLoggerModule],
})
export class CustomHttpExceptionModule {}
