import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Session } from '../database/models/session.model';

import { SessionGuard } from './guards/session.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Session,
    ]),
  ],
  providers: [
    SessionGuard,
    RolesGuard,
  ],
  exports: [
    SessionGuard,
    RolesGuard,
  ],
})
export class CommonModule {}