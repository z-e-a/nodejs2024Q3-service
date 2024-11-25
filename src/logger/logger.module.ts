import { Module } from '@nestjs/common';
import { CustomLogger } from './customLogger.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [CustomLogger, LoggerMiddleware],
  exports: [CustomLogger, LoggerMiddleware],
  // imports: [],
})
export class CustomLoggerModule {}
