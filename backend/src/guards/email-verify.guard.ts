import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("User not authenticated");
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException(
        "Please verify your email to access this resource"
      );
    }

    return true; // allow access
  }
}
