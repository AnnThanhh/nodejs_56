import { TokenService } from './../../modules-system/token/token.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

// ghép prefix của Controller với path của handler để ra route pattern gốc (không kèm global prefix 'api')
function buildRoutePath(
  controllerPath: string | string[],
  handlerPath: string | string[],
): string {
  const parts = [controllerPath, handlerPath]
    .flat()
    .map((part) => (part ?? '').toString().replace(/^\/+|\/+$/g, ''))
    .filter((part) => part.length > 0);

  return '/' + parts.join('/');
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user?.roleId) {
      throw new ForbiddenException('Tài khoản chưa được phân quyền');
    }

    const controllerPath: string | string[] =
      this.reflector.get(PATH_METADATA, context.getClass()) ?? '';
    const handlerPath: string | string[] =
      this.reflector.get(PATH_METADATA, context.getHandler()) ?? '';
    const url = buildRoutePath(controllerPath, handlerPath);

    // check quyền hoàn toàn trong db: role -> role_permission (isActive) -> permission (method + url)
    const permission = await this.prisma.rolePermissions.findFirst({
      where: {
        roleId: user.roleId,
        isActive: true,
        Permissions: {
          method: req.method,
          url,
        },
      },
    });

    if (!permission) {
      throw new ForbiddenException('Bạn không có quyền truy cập chức năng này');
    }

    return true;
  }
}
