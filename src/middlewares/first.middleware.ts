import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class FirsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('hello hello this is the first middleware !!!');
    next();
  }
}
