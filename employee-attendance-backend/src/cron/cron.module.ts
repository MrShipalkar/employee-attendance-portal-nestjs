import { Module } from '@nestjs/common';

import { ReportsModule } from '../reports/reports.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';

import { MonthlyReportCron } from './monthly-report.cron';

@Module({
  imports: [
    ReportsModule,
    UsersModule,
    MailModule,
  ],
  providers: [
    MonthlyReportCron,
  ],
})
export class CronModule {}