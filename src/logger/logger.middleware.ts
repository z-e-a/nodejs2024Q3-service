import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './customLogger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      this.logger.log(
        `URL:${req.url} QUERY_PARAMS:${JSON.stringify(
          req.query,
        )} BODY:${JSON.stringify(req.body)} ${res.statusCode}`,
        this.constructor.name,
      );
    });
    next();
  }
}
