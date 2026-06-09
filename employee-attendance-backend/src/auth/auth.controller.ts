import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SessionGuard } from '../common/guards/session.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

@Post('login')
@ApiOperation({
  summary: 'User Login',
  description:
    'Authenticate user and return JWT token',
})
@ApiResponse({
  status: 200,
  description: 'Login successful',
})
@ApiResponse({
  status: 401,
  description: 'Invalid credentials',
})
async login(
  @Body() loginDto: LoginDto,
) {
  return this.authService.login(
    loginDto.username,
    loginDto.password,
  );
}
  // async login(
  //   @Body() loginDto: LoginDto,
  // ) {
  //   return this.authService.login(
  //     loginDto.username,
  //     loginDto.password,
  //   );
  // }

//   async login(
//   username: string,
//   password: string,
// ) {
//   if (
//     username === 'admin' &&
//     password === 'admin123'
//   ) {
//     return {
//       success: true,
//       user: {
//         id: 1,
//         username: 'admin',
//         role: 'ADMIN',
//       },
//     };
//   }

//   return {
//     success: false,
//     message:
//       'Invalid Credentials',
//   };
// }

  @Get('profile')
  @UseGuards(
    JwtAuthGuard,
    SessionGuard,
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get Logged-in User Profile',
  })
  @ApiResponse({
    status: 200,
    description:
      'User profile returned successfully',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized',
  })
  async profile(@Req() req) {
    return this.authService.profile(
      req.user.id,
    );
  }

  @Post(
    'send-change-password-otp',
  )
  @UseGuards(
    JwtAuthGuard,
    SessionGuard,
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Send OTP for password change',
  })
  async sendOtp(
    @Req() req,
  ) {
    return this.authService.sendChangePasswordOtp(
      req.user.id,
    );
  }

  @Post('change-password')
  @UseGuards(
    JwtAuthGuard,
    SessionGuard,
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Change Password',
    description:
      'Change current password and disable force password change flag',
  })
  @ApiResponse({
    status: 200,
    description:
      'Password changed successfully',
  })
  @ApiResponse({
    status: 400,
    description:
      'Current password is incorrect',
  })
  async changePassword(
    @Req() req,

    @Body()
    dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      req.user.id,
      dto,
    );
  }

  @Post('logout')
  @UseGuards(
    JwtAuthGuard,
    SessionGuard,
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout User',
  })
  @ApiResponse({
    status: 200,
    description:
      'Logged out successfully',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized',
  })
  async logout(@Req() req) {
    const token =
      req.headers.authorization?.replace(
        'Bearer ',
        '',
      );

    return this.authService.logout(
      token,
    );
  }

 @Get('test-ms')
async testMicroservice(
  @Query('username')
  username: string,

  @Query('password')
  password: string,
) {
  return this.authService.testMicroservice(
    username,
    password,
  );
}


}