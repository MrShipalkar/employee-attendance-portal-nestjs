import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Attendance } from '../database/models/attendance.model';
import { User } from '../database/models/user.model';

import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { Session } from '../database/models/session.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Attendance,
      User,
      Session,
    ]),
  ],
  controllers: [
    AttendanceController,
  ],
  providers: [
    AttendanceService,
  ],
})
export class AttendanceModule {}