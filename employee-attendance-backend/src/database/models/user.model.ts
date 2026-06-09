import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { Role } from './role.model';
import { Attendance } from './attendance.model';
import { LeaveRequest } from './leave-request.model';
import { LeaveBalance } from './leave-balance.model';
import {
  HasOne,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    allowNull: false,
  })
  declare firstName: string;

  @Column({
    allowNull: false,
  })
  declare lastName: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    allowNull: false,
  })
  declare passwordHash: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare roleId: string;

  @BelongsTo(() => Role)
  declare role: Role;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare managerId: string | null;

  @BelongsTo(() => User, 'managerId')
  declare manager: User;

  @HasMany(() => Attendance)
  declare attendances: Attendance[];

  @HasMany(() => LeaveRequest)
  declare leaveRequests: LeaveRequest[];

  @Column({
    defaultValue: true,
  })
  declare isActive: boolean;

  @Column({
    defaultValue: false,
  })
  declare forcePasswordChange: boolean;

  @Column({
    field: 'otp',
    type: DataType.STRING(10),
    allowNull: true,
  })
  declare otp: string | null;

  @Column({
    field: 'otp_expires_at',
    type: DataType.DATE,
    allowNull: true,
  })
  declare otpExpiresAt: Date | null;

  @Column({
    field: 'profile_picture',
    type: DataType.STRING,
    allowNull: true,
  })
  declare profilePicture: string | null;


  @HasOne(() => LeaveBalance)
declare leaveBalance: LeaveBalance;
}

