import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: any, response: any, next: any): void {
    const { method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(`${method} ${originalUrl} ${statusCode}`);
    });

    next();
  }
}
