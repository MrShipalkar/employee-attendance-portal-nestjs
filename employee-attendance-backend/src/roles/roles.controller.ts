import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SessionGuard } from '../common/guards/session.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';

import { Permissions } from '../common/decorators/permissions.decorator';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
@UseGuards(
  JwtAuthGuard,
  SessionGuard,
  PermissionsGuard,
)
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
  ) {}

  @Get()
@Permissions('ROLE_VIEW')
async getRoles() {
  return this.rolesService.findAll();
}
}