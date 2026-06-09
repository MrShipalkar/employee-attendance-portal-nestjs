import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from '../database/models/user.model';
import { Session } from '../database/models/session.model';

import { JwtStrategy } from './strategies/jwt.strategy';
import { Role } from '../database/models/role.model';
import { Permission } from '../database/models/permission.model';
import { RolePermission } from '../database/models/role-permission.model';
import { MailModule } from '../mail/mail.module';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,

    SequelizeModule.forFeature([
      User,
      Session,
      Role,
      Permission,
      RolePermission,
    ]),

    MailModule, // 👈 ADD THIS

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (
        config: ConfigService,
      ) => ({
        secret:
          config.get<string>(
            'JWT_SECRET',
          ),

        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
    
    ClientsModule.register([
    {
      name: 'AUTH_MICROSERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 5001,
      },
    },
  ]),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    JwtStrategy,
  ],

  exports: [
    AuthService,
  ],
})
export class AuthModule {}