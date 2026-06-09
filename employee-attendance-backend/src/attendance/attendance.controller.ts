import {
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { AttendanceService } from './attendance.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
// import { RolesGuard } from '../common/guards/roles.guard';
import { SessionGuard } from '../common/guards/session.guard';

// import { Roles } from '../common/decorators/roles.decorator';
// import { RoleEnum } from '../common/enums/role.enum';

import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';

@ApiTags('Attendance')
@ApiBearerAuth()
@Controller('attendance')
@UseGuards(
  JwtAuthGuard,
  SessionGuard,
  PermissionsGuard,
)
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
  ) {}

  @Post('check-in')
 @Permissions('ATTENDANCE_MARK')
  @ApiOperation({
    summary: 'Check In',
    description:
      'Employee, Manager or Admin can check in once per day',
  })
  @ApiResponse({
    status: 201,
    description:
      'Check-in successful',
  })
  @ApiResponse({
    status: 400,
    description:
      'Already checked in today',
  })
  async checkIn(@Req() req) {
    return this.attendanceService.checkIn(
      req.user.id,
    );
  }

  @Post('check-out')
  @Permissions('ATTENDANCE_MARK')
  @ApiOperation({
    summary: 'Check Out',
    description:
      'Employee, Manager or Admin can check out after checking in',
  })
  @ApiResponse({
    status: 200,
    description:
      'Check-out successful',
  })
  @ApiResponse({
    status: 400,
    description:
      'Check-in not found or already checked out',
  })
  async checkOut(@Req() req) {
    return this.attendanceService.checkOut(
      req.user.id,
    );
  }
  @Permissions('ATTENDANCE_VIEW')
  @Get('my')
  @ApiOperation({
    summary:
      'Get My Attendance History',
  })
  @ApiResponse({
    status: 200,
    description:
      'Attendance history returned successfully',
  })
  async getMyAttendance(
    @Req() req,
  ) {
    return this.attendanceService.getMyAttendance(
      req.user.id,
    );
  }

  @Get('team')
  @Permissions('ATTENDANCE_VIEW')
  @ApiOperation({
    summary:
      'Get Team Attendance',
    description:
      'Managers can view attendance of employees assigned to them',
  })
  @ApiResponse({
    status: 200,
    description:
      'Team attendance returned successfully',
  })
  @ApiResponse({
    status: 403,
    description:
      'Access denied',
  })
  async getTeamAttendance(
    @Req() req,
  ) {
    return this.attendanceService.getTeamAttendance(
      req.user.id,
    );
  }

  @Get('all')
  @Permissions('ATTENDANCE_VIEW')
  @ApiOperation({
    summary:
      'Get All Attendance',
    description:
      'HR and Admin can view attendance of all employees',
  })
  @ApiResponse({
    status: 200,
    description:
      'All attendance records returned successfully',
  })
  @ApiResponse({
    status: 403,
    description:
      'Access denied',
  })
  async getAllAttendance() {
    return this.attendanceService.getAllAttendance();
  }
}