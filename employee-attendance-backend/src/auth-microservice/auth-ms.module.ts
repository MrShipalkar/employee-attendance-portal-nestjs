import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from '../database/database.module';

import { AuthMsController } from './auth-ms.controller';
import { AuthMsService } from './auth-ms.service';

import { User } from '../database/models/user.model';
import { Role } from '../database/models/role.model';
import { Permission } from '../database/models/permission.model';
import { Session } from '../database/models/session.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,

    SequelizeModule.forFeature([
      User,
      Role,
      Permission,
      Session,
    ]),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (
        config: ConfigService,
      ) => ({
        secret: config.get<string>(
          'JWT_SECRET',
        ),

        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],

  controllers: [
    AuthMsController,
  ],

  providers: [
    AuthMsService,
  ],
})
export class AuthMsModule {}