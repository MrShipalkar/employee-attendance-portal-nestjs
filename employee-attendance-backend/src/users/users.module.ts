import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { User } from '../database/models/user.model';
import { Role } from '../database/models/role.model';
import { Session } from '../database/models/session.model';
import { Attendance } from '../database/models/attendance.model';
import { LeaveRequest } from '../database/models/leave-request.model';

import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      Session,
      Attendance,
      LeaveRequest,
    ]),

    MailModule,
  ],

  controllers: [
    UsersController,
  ],

  providers: [
    UsersService,
  ],

  exports: [
    UsersService,
  ],
})
export class UsersModule {}