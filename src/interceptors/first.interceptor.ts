import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class FirstInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();
    console.log('created Req at ' + dateIn);
    console.log('First interceptor');
    return next.handle().pipe(
      tap(() => {
        const newDate = Date.now();
        console.log('request end at  ' + newDate);

        console.log(`Request duration is: ${(+newDate - +dateIn) + ` ms`}`);
      })
    );
  }
}
