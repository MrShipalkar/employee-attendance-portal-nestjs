import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { Role } from './role.model';
import { RolePermission } from './role-permission.model';

@Table({
  tableName: 'permissions',
  timestamps: true,
})
export class Permission extends Model<Permission> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    allowNull: false,
  })
  declare category: string;

  @Column
  declare description: string;

  @BelongsToMany(
    () => Role,
    () => RolePermission,
  )
  declare roles: Role[];
}