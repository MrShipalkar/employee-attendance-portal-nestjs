import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { Session } from '../../database/models/session.model';

@Injectable()
export class SessionGuard
  implements CanActivate
{
  constructor(
    @InjectModel(Session)
    private readonly sessionModel: typeof Session,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request =
      context.switchToHttp().getRequest();

    const authHeader =
      request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(
        'Authorization token missing',
      );
    }

    const token = authHeader.replace(
      'Bearer ',
      '',
    );

    const session =
      await this.sessionModel.findOne({
        where: {
          token,
        },
      });

    if (!session) {
      throw new UnauthorizedException(
        'Session not found',
      );
    }

    const now = new Date();

    const minutesDifference =
      (now.getTime() -
        new Date(
          session.lastActivity,
        ).getTime()) /
      (1000 * 60);

    if (minutesDifference > 15) {
      await session.destroy();

      throw new UnauthorizedException(
        'Session expired due to inactivity',
      );
    }

    await session.update({
      lastActivity: new Date(),
    });

    return true;
  }
}