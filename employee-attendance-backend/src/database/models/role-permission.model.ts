import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Role } from './role.model';
import { Permission } from './permission.model';

@Table({
  tableName: 'role_permissions',
  timestamps: true,
})
export class RolePermission extends Model<RolePermission> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare roleId: string;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare permissionId: string;

  @BelongsTo(() => Role)
  declare role: Role;

  @BelongsTo(() => Permission)
declare permission: Permission;
}