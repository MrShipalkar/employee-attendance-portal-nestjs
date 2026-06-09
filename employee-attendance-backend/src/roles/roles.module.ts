import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Role } from '../database/models/role.model';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Session } from '../database/models/session.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Role,
      Session,
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}