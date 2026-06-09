import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

import { Attendance } from '../database/models/attendance.model';
import { LeaveRequest } from '../database/models/leave-request.model';
import { User } from '../database/models/user.model';
import { Session } from '../database/models/session.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Attendance,
      LeaveRequest,
      User,
      Session,
    ]),
  ],
  controllers: [
    ReportsController,
  ],
  providers: [
    ReportsService,
  ],
  exports: [
    ReportsService,
  ],
})
export class ReportsModule {}