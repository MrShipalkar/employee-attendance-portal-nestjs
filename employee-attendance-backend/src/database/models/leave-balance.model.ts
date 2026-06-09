import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from './user.model';

@Table({
  tableName: 'leave_balances',
  timestamps: true,
})
export class LeaveBalance extends Model<LeaveBalance> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;

  @Column({
    defaultValue: 12,
  })
  declare sickLeave: number;

  @Column({
    defaultValue: 12,
  })
  declare casualLeave: number;

  @Column({
    defaultValue: 18,
  })
  declare earnedLeave: number;
}