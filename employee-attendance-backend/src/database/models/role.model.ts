import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from 'sequelize-typescript';

import { User } from './user.model';
import { BelongsToMany } from 'sequelize-typescript';
import { Permission } from './permission.model';
import { RolePermission } from './role-permission.model';

@Table({
  tableName: 'roles',
  timestamps: true,
})
export class Role extends Model<Role> {

  @BelongsToMany(
  () => Permission,
  () => RolePermission,
)
declare permissions: Permission[];

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

  @HasMany(() => User)
  declare users: User[];
}