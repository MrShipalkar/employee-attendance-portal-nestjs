import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from '../database/models/user.model';
import { Session } from '../database/models/session.model';
import { Role } from '../database/models/role.model';
import { Permission } from '../database/models/permission.model';

import { ChangePasswordDto } from './dto/change-password.dto';

import { MailService } from '../mail/mail.service';
import { Inject } from '@nestjs/common';

import {
  ClientProxy,
} from '@nestjs/microservices';

import {
  firstValueFrom,
} from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    @InjectModel(Session)
    private readonly sessionModel: typeof Session,

    private readonly jwtService: JwtService,

    private readonly mailService: MailService,
     @Inject(
    'AUTH_MICROSERVICE',
  )
  private readonly authClient: ClientProxy,
  ) { }

  // async login(
  //   username: string,
  //   password: string,
  // ) {
  //   const user =
  //     await this.userModel.findOne({
  //       where: {
  //         username,
  //       },

  //       include: [
  //         {
  //           model: Role,
  //           include: [Permission],
  //         },
  //       ],
  //     });

  //   if (!user) {
  //     throw new UnauthorizedException(
  //       'Invalid credentials',
  //     );
  //   }

  //   const isPasswordValid =
  //     await bcrypt.compare(
  //       password,
  //       user.passwordHash,
  //     );

  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException(
  //       'Invalid credentials',
  //     );
  //   }

  //   const payload = {
  //     id: user.id,
  //     username: user.username,
  //     role: user.role?.name,
  //   };

  //   const accessToken =
  //     await this.jwtService.signAsync(
  //       payload,
  //     );

  //   await this.sessionModel.create({
  //     userId: user.id,
  //     token: accessToken,
  //     lastActivity: new Date(),
  //   } as any);

  //   return {
  //     accessToken,

  //     forcePasswordChange:
  //       user.forcePasswordChange,

  //     user: {
  //       id: user.id,

  //       firstName:
  //         user.firstName,

  //       lastName:
  //         user.lastName,

  //       username:
  //         user.username,

  //       email:
  //         user.email,

  //       profilePicture:
  //         user.profilePicture,

  //       role:
  //         user.role?.name,

  //       permissions:
  //         user.role?.permissions?.map(
  //           permission =>
  //             permission.name,
  //         ) || [],
  //     },
  //   };
  // }

  async login(
  username: string,
  password: string,
) {
  return firstValueFrom(
    this.authClient.send(
      'login',
      {
        username,
        password,
      },
    ),
  );
}

  async profile(
    userId: string,
  ) {
    const user =
      await this.userModel.findByPk(
        userId,
        {
          include: [
            {
              model: Role,
              include: [
                Permission,
              ],
            },
          ],

          attributes: {
            exclude: [
              'passwordHash',
            ],
          },
        },
      );

    if (!user) {
      return null;
    }

    return {
      id: user.id,

      firstName:
        user.firstName,

      lastName:
        user.lastName,

      username:
        user.username,

      email:
        user.email,

      role:
        user.role?.name,

      permissions:
        user.role?.permissions?.map(
          permission =>
            permission.name,
        ) || [],
    };
  }

  async sendChangePasswordOtp(
    userId: string,
  ) {
    const user =
      await this.userModel.findByPk(
        userId,
      );

    if (!user) {
      throw new UnauthorizedException(
        'User not found',
      );
    }

    const otp =
      Math.floor(
        100000 +
        Math.random() *
        900000,
      ).toString();

    const expiry =
      new Date(
        Date.now() +
        10 * 60 * 1000,
      );

    // console.log(
    //   'CURRENT TIME:',
    //   new Date().toISOString(),
    // );

    // console.log(
    //   'GENERATED EXPIRY:',
    //   expiry.toISOString(),
    // );

    await user.update({
      otp,
      otpExpiresAt: expiry,
    });

    const updatedUser =
      await this.userModel.findByPk(
        user.id,
      );

    // console.log(
    //   'OTP SAVED:',
    //   updatedUser?.otp,
    // );

    // console.log(
    //   'EXPIRY SAVED:',
    //   updatedUser?.otpExpiresAt,
    // );

    await this.mailService.sendOtpMail(
      user.email,
      otp,
    );

    return {
      message:
        'OTP sent successfully',
    };
  }

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
  ) {
    const user =
      await this.userModel.findByPk(
        userId,
      );

    if (!user) {
      throw new UnauthorizedException(
        'User not found',
      );
    }

    const isValid =
      await bcrypt.compare(
        dto.currentPassword,
        user.passwordHash,
      );

    if (!isValid) {
      throw new BadRequestException(
        'Current password is incorrect',
      );
    }

    if (
      !user.otp ||
      user.otp !== dto.otp
    ) {
      throw new BadRequestException(
        'Invalid OTP',
      );
    }

    if (
      !user.otpExpiresAt
    ) {
      throw new BadRequestException(
        'OTP expired',
      );
    }

    const now =
      Date.now();

    const expiryTime =
      user.otpExpiresAt.getTime();

    // console.log(
    //   'NOW:',
    //   new Date(
    //     now,
    //   ).toISOString(),
    // );

    // console.log(
    //   'EXPIRY:',
    //   user.otpExpiresAt.toISOString(),
    // );

    // console.log(
    //   'SECONDS LEFT:',
    //   Math.floor(
    //     (expiryTime -
    //       now) /
    //     1000,
    //   ),
    // );

    if (
      expiryTime < now
    ) {
      throw new BadRequestException(
        'OTP expired',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        dto.newPassword,
        10,
      );

    await user.update({
      passwordHash:
        hashedPassword,

      forcePasswordChange:
        false,

      otp: null,

      otpExpiresAt:
        null,
    });

    return {
      message:
        'Password changed successfully',
    };
  }

  async logout(
    token: string,
  ) {
    await this.sessionModel.destroy({
      where: {
        token,
      },
    });

    return {
      message:
        'Logged out successfully',
    };
  }

async testMicroservice(
  username: string,
  password: string,
) {
  return firstValueFrom(
    this.authClient.send(
      'login',
      {
        username,
        password,
      },
    ),
  );
}
}