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
  tableName: 'leave_requests',
  timestamps: true,
})
export class LeaveRequest extends Model<LeaveRequest> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;

  @Column({
    type: DataType.DATEONLY,
  })
  declare startDate: Date;

  @Column({
    type: DataType.DATEONLY,
  })
  declare endDate: Date;

  @Column({
    allowNull: false,
  })
  declare leaveType: string;

  @Column({
    type: DataType.TEXT,
  })
  declare reason: string;

  @Column({
    defaultValue: 'PENDING',
  })
  declare status: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare remarks: string | null;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare approvedBy: string | null;
}