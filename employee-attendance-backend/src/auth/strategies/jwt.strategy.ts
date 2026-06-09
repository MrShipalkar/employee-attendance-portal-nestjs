import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../../database/models/user.model';
import { Role } from '../../database/models/role.model';
import { Permission } from '../../database/models/permission.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(
  private readonly configService: ConfigService,

  @InjectModel(User)
  private readonly userModel: typeof User,
) {
  super({
    jwtFromRequest:
      ExtractJwt.fromAuthHeaderAsBearerToken(),

    ignoreExpiration: false,

    secretOrKey:
      configService.get<string>(
        'JWT_SECRET',
      )!,
  });
}

async validate(payload: any) {
  const user =
    await this.userModel.findByPk(
      payload.id,
      {
        include: [
          {
            model: Role,
            include: [Permission],
          },
        ],
      },
    );

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role?.name,

    permissions:
      user.role?.permissions?.map(
        permission => permission.name,
      ) || [],
  };
}
}