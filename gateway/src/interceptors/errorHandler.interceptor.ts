import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErorrHandlerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) =>
        throwError(
          () =>
            new HttpException(
              {
                statusCode: err.statusCode,
                message: err.message,
                data: {
                  result: err,
                  meta: {},
                },
              },
              err.statusCode || HttpStatus.BAD_REQUEST,
            ),
        ),
      ),
    );
  }
}
