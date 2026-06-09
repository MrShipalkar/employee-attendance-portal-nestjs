import {
  Body,
  Controller,
  Get,
  Param,
  Put,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { PermissionsService } from './permissions.service';

import { UpdateRolePermissionsDto } from './dto/update-role-permissions.dto';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SessionGuard } from '../common/guards/session.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';

import { Permissions } from '../common/decorators/permissions.decorator';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
@UseGuards(
  JwtAuthGuard,
  SessionGuard,
  PermissionsGuard,
)
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
  ) {}

@Get()
@Permissions('PERMISSION_UPDATE')
async getPermissions() {
  return this.permissionsService.findAll();
}

@Get('role/:roleId')
@Permissions('PERMISSION_UPDATE')
async getRolePermissions(
  @Param('roleId') roleId: string,
) {
  return this.permissionsService.getRolePermissions(
    roleId,
  );
}

@Put('role/:roleId')
@Permissions('PERMISSION_UPDATE')
async updateRolePermissions(
  @Param('roleId') roleId: string,
  @Body() dto: UpdateRolePermissionsDto,
) {
  return this.permissionsService.updateRolePermissions(
    roleId,
    dto.permissionIds,
  );
}
}