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