import {
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';

import { Model } from 'sequelize-typescript';


import { User } from './user.model';

@Table({
    tableName: 'employee_salaries',
})
export class EmployeeSalary extends Model<EmployeeSalary> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare employeeId: string;

    @BelongsTo(() => User)
    declare employee: User;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare basicSalary: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0,
    })
    declare hra: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0,
    })
    declare da: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0,
    })
    declare specialAllowance: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0,
    })
    declare bonus: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0,
    })
    declare pfDeduction: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0,
    })
    declare professionalTax: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0,
    })
    declare tds: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    declare isActive: boolean;
}