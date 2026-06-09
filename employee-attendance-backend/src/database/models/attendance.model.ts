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
  tableName: 'attendances',
  timestamps: true,
})
export class Attendance extends Model<Attendance> {
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
  declare attendanceDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare checkIn: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare checkOut: Date;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: true,
  })
  declare totalHours: number;
}