import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { LeaveRequest } from '../database/models/leave-request.model';
import { User } from '../database/models/user.model';

import { LeavesController } from './leaves.controller';
import { LeavesService } from './leaves.service';
import { Session } from '../database/models/session.model';
import { LeaveBalance } from '../database/models/leave-balance.model';



@Module({
  imports: [
    SequelizeModule.forFeature([
       LeaveRequest,
      LeaveBalance,
      User,
      Session,
    ]),
  ],
  controllers: [
    LeavesController,
  ],
  providers: [
    LeavesService,
  ],
  exports: [
    LeavesService,
  ],
})
export class LeavesModule {}