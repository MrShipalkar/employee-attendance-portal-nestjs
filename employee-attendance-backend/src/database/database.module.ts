import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

import { Role } from './models/role.model';
import { User } from './models/user.model';
import { Attendance } from './models/attendance.model';
import { LeaveRequest } from './models/leave-request.model';
import { Session } from './models/session.model';
import { Permission } from './models/permission.model';
import { RolePermission } from './models/role-permission.model';
import { LeaveBalance } from './models/leave-balance.model';
import { EmployeeSalary } from './models/employee-salary.model';
import { Payroll } from './models/payroll.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({

      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),

        models: [
          Role,
          User,
          Attendance,
          LeaveRequest,
          Session,
          Permission,
          RolePermission,
          LeaveBalance,
           EmployeeSalary,
  Payroll,
        ],

        autoLoadModels: true,
        synchronize: false,
        timezone: '+05:30',
        dialectOptions: {
          useUTC: false,
        },
      }),
    }),
  ],
})
export class DatabaseModule { }