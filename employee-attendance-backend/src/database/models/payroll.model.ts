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
    tableName: 'payrolls',
    timestamps: true,
})
export class Payroll extends Model<Payroll> {
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
    })
    declare employeeId: string;

    @BelongsTo(() => User)
    declare employee: User;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare month: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare year: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare workingDays: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare presentDays: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare absentDays: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare grossSalary: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare deductions: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare netSalary: number;

    @Column({
        type: DataType.STRING,
        defaultValue: 'GENERATED',
    })
    declare status: string;

   @Column({
  type: DataType.DECIMAL(10, 2),
  allowNull: false,
  defaultValue: 0,
})
declare absentDeduction: number;
}