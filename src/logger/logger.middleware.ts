import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './customLogger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      let level = 'log';
      if (Number(res.statusCode) >= 400) level = 'warn';
      if (Number(res.statusCode) >= 500) level = 'error';
      this.logger[level](
        `METHOD:${req.method} URL:${req.url} QUERY_PARAMS:${JSON.stringify(
          req.query,
        )} BODY:${JSON.stringify(req.body)} - STATUS:${res.statusCode}`,
        this.constructor.name,
      );
    });
    next();
  }
}
