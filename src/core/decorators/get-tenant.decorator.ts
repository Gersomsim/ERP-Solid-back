import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetTenant = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const tenant = req.user?.tenant;
  if (!tenant)
    throw new InternalServerErrorException('Tenant not found (request)');
  return tenant;
});
