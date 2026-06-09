import {
  Controller,
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

import { DashboardService } from './dashboard.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SessionGuard } from '../common/guards/session.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(
  JwtAuthGuard,
  SessionGuard,
  PermissionsGuard,
)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get('admin')
  @Permissions('DASHBOARD_VIEW')
  @ApiOperation({
    summary: 'Admin Dashboard',
    description:
      'Returns complete system statistics for Admin',
  })
  @ApiResponse({
    status: 200,
    description:
      'Admin dashboard statistics returned successfully',
  })
  @ApiResponse({
    status: 403,
    description:
      'Access denied',
  })
  async getAdminDashboard() {
    return this.dashboardService.getAdminDashboard();
  }

  @Get('manager')
  @Permissions('DASHBOARD_VIEW')
  @ApiOperation({
    summary: 'Manager Dashboard',
    description:
      'Returns attendance and leave statistics for employees under the manager',
  })
  @ApiResponse({
    status: 200,
    description:
      'Manager dashboard statistics returned successfully',
  })
  @ApiResponse({
    status: 403,
    description:
      'Access denied',
  })
  async getManagerDashboard(
    @Req() req,
  ) {
    return this.dashboardService.getManagerDashboard(
      req.user.id,
    );
  }

  @Get('hr')
  @Permissions('DASHBOARD_VIEW')
  @ApiOperation({
    summary: 'HR Dashboard',
    description:
      'Returns organization attendance and leave statistics for HR',
  })
  @ApiResponse({
    status: 200,
    description:
      'HR dashboard statistics returned successfully',
  })
  @ApiResponse({
    status: 403,
    description:
      'Access denied',
  })
  async getHRDashboard() {
    return this.dashboardService.getHRDashboard();
  }

  @Get('employee')
@Permissions('DASHBOARD_VIEW')
async getEmployeeDashboard(
  @Req() req,
) {
  return this.dashboardService.getEmployeeDashboard(
    req.user.id,
  );
}
}