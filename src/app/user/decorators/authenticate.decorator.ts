import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

export function Authenticate() {
  return applyDecorators(ApiBearerAuth('access-token'), UseGuards(AuthGuard));
}
