import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Permission } from '../database/models/permission.model';

import { RolePermission } from '../database/models/role-permission.model';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission)
    private readonly permissionModel: typeof Permission,

    @InjectModel(RolePermission)
    private readonly rolePermissionModel: typeof RolePermission,
  ) { }

  async findAll() {
    return this.permissionModel.findAll({
      order: [
        ['category', 'ASC'],
        ['name', 'ASC'],
      ],
    });
  }

  async getRolePermissions(
    roleId: string,
  ) {
    const permissions =
      await this.rolePermissionModel.findAll({
        where: { roleId },
      });

    return {
      roleId,
      permissionIds: permissions.map(
        p => p.permissionId,
      ),
    };
  }

  async updateRolePermissions(
  roleId: string,
  permissionIds: string[],
) {

  await this.rolePermissionModel.destroy({
    where: { roleId },
  });

  if (permissionIds.length > 0) {
    await this.rolePermissionModel.bulkCreate(
      permissionIds.map(
        permissionId => ({
          roleId,
          permissionId,
        }),
      ) as any,
    );
  }

  return {
    message:
      'Permissions updated successfully',
  };
}
}