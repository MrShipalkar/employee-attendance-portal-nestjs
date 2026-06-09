import {
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { RolesGuard } from '../src/common/guards/roles.guard';

import { Roles } from '../src/common/decorators/roles.decorator';
import { RoleEnum } from '../src/common/enums/role.enum';

import { MailService } from '../src/mail/mail.service';

@Controller('test')
export class TestController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @Get('admin')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(RoleEnum.ADMIN)
  adminOnly() {
    return {
      message:
        'Admin Access Granted',
    };
  }

  @Get('hr')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    RoleEnum.ADMIN,
    RoleEnum.HR,
  )
  hrAccess() {
    return {
      message:
        'HR Access Granted',
    };
  }

  @Get('manager')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    RoleEnum.ADMIN,
    RoleEnum.MANAGER,
  )
  managerAccess() {
    return {
      message:
        'Manager Access Granted',
    };
  }

  @Post('mail')
  async sendTestMail() {
    await this.mailService.sendPasswordResetMail(
      'ashwinshipalkar1@gmail.com',
      'employee1',
      'Temp@123456',
    );

    return {
      message:
        'Mail sent successfully',
    };
  }
}