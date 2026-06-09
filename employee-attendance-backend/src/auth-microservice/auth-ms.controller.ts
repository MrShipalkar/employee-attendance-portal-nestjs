import { Controller } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';

import { AuthMsService } from './auth-ms.service';

@Controller()
export class AuthMsController {
  constructor(
    private readonly authMsService: AuthMsService,
  ) {}

  @MessagePattern('login')
  login(data: {
    username: string;
    password: string;
  }) {
    return this.authMsService.login(
      data.username,
      data.password,
    );
  }
}