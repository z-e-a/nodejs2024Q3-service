import {
  ConsoleLogger,
  Injectable,
  type LogLevel,
  type LoggerService,
} from '@nestjs/common';
import { join, resolve } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { writeFile, stat } from 'node:fs/promises';
import { EOL } from 'node:os';

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  private readonly logLevel: number;
  private readonly logFileSize: number;
  private currFile = {};

  constructor() {
    super();
    this.logLevel = parseInt(process.env.LOG_LEVEL);
    this.logFileSize = parseInt(process.env.LOG_FILE_SIZE);
    this.currFile = {
      err: 1,
      log: 1,
    };
  }

  static create() {
    return new CustomLogger();
  }

  log(message: string, context: string) {
    if (this.logLevel >= 2) {
      super.log(message, context);
      this.writeToFile(message, context, 'log');
    }
  }

  error(message: string, context: string) {
    if (this.logLevel >= 0) {
      super.error(message, context);
      this.writeToFile(message, context, 'log');
      this.writeToFile(message, context, 'err');
    }
  }

  warn(message: string, context: string) {
    if (this.logLevel >= 1) {
      super.warn(message, context);
    }
  }

  debug(message: string, context: string) {
    if (this.logLevel >= 3) {
      super.debug(message, context);
    }
  }

  verbose(message: string, context: string) {
    if (this.logLevel >= 4) {
      super.verbose(message, context);
    }
  }

  fatal(message: string, context: string) {
    super.fatal(message, context);
  }

  setLogLevels(levels: LogLevel[]) {
    super.setLogLevels(levels);
  }

  async writeToFile(message: string, context: string, level: string) {
    const destPath = join(process.cwd(), 'log');
    mkdirSync(destPath, { recursive: true });
    const logFilePath = await this.getLogFileName(destPath, level);
    writeFile(
      logFilePath,
      `${new Date().toISOString()} - [${context}] ${message}${EOL}`,
      { flag: 'a' },
    );
  }

  async getLogFileName(dirPath: string, level: string) {
    let fileNum = 1;
    while (true) {
      const logFilePath = resolve(dirPath, `${level}_${fileNum}${'.log'}`);
      if (existsSync(logFilePath)) {
        const { size } = await stat(logFilePath);
        if (size < this.logFileSize) {
          this.currFile[level] = fileNum;
          return logFilePath;
        } else {
          fileNum++;
        }
      } else {
        this.currFile[level] = fileNum;
        return resolve(dirPath, `${level}_${fileNum}${'.log'}`);
      }
    }
  }
}
