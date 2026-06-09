import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

import { TestController } from '../test/test.controller';
import {TestModule} from '../test/test.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LeavesModule } from './leaves/leaves.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { MailModule } from './mail/mail.module';
import { ReportsModule } from './reports/reports.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { AuthMsModule } from './auth-microservice/auth-ms.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,
    AuthModule,
    TestModule,
    CommonModule,
    UsersModule,
    AttendanceModule,
    LeavesModule,
    DashboardModule,
    PermissionsModule,
    RolesModule,
    MailModule,
    ReportsModule,
    CronModule,
    AuthMsModule,
    ScheduleModule.forRoot(),
  ],

  controllers: [
    TestController,
  ],

  providers: [],
})
export class AppModule {}