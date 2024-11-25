import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './customLogger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      this.logger.log(
        `${req.url} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)} ${
          res.statusCode
        }`,
      );
    });
    next();
  }
}
