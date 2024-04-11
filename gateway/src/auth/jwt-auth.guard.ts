import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { MESSAGES_RESPONSE } from 'src/constants/messages.constant';
import { IS_PUBLIC_KEY } from 'src/decorators/auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass,
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
  handleRequest<UserPayload>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): UserPayload {
    if (err || !user) {
      throw err || new UnauthorizedException(MESSAGES_RESPONSE.PRIVATE_ROUTE);
    }
    return user;
  }
}
