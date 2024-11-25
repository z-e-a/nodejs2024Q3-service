import {
  ConsoleLogger,
  Injectable,
  type LogLevel,
  type LoggerService,
} from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  static create() {
    return new CustomLogger();
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(message, JSON.stringify(optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message, optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    super.fatal(message, optionalParams);
  }

  setLogLevels(levels: LogLevel[]) {
    super.setLogLevels(levels);
  }
}
