import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Permission } from '../database/models/permission.model';
import { Role } from '../database/models/role.model';
import { RolePermission } from '../database/models/role-permission.model';

import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { Session } from '../database/models/session.model';


@Module({
  imports: [
    SequelizeModule.forFeature([
      Permission,
      Role,
      RolePermission,
      Session,
    ]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}