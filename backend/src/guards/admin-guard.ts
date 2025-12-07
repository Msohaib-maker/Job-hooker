import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const role = req.headers["x-role"];
    const pass = req.headers["x-pass"];
    const validRole = "MisterRobot";
    const validPass = "Lo3kedHe2ven#!#";

    if (role === validRole && pass === validPass) {
      return true;
    }

    return false;
  }
}
