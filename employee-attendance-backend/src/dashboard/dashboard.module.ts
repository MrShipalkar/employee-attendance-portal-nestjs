import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '../database/models/user.model';
import { Attendance } from '../database/models/attendance.model';
import { LeaveRequest } from '../database/models/leave-request.model';
import { Role } from '../database/models/role.model';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Session } from '../database/models/session.model';


@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Attendance,
      LeaveRequest,
      Role,
      Session,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}