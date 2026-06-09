import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { LeavesService } from './leaves.service';

import { ApplyLeaveDto } from './dto/apply-leave.dto';
import { LeaveActionDto } from './dto/leave-action.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
// import { RolesGuard } from '../common/guards/roles.guard';
import { SessionGuard } from '../common/guards/session.guard';

// import { Roles } from '../common/decorators/roles.decorator';
// import { RoleEnum } from '../common/enums/role.enum';

import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';

@ApiTags('Leave Management')
@ApiBearerAuth()
@Controller('leaves')
@UseGuards(
  JwtAuthGuard,
  SessionGuard,
  PermissionsGuard,
)
export class LeavesController {
  constructor(
    private readonly leavesService: LeavesService,
  ) { }

  @Post('apply')
  @Permissions('LEAVE_CREATE')
  @ApiOperation({
    summary: 'Apply Leave',
    description:
      'Employee, Manager and Admin can submit leave requests',
  })
  @ApiResponse({
    status: 201,
    description:
      'Leave request submitted successfully',
  })
  async applyLeave(
    @Req() req,
    @Body() dto: ApplyLeaveDto,
  ) {
    return this.leavesService.applyLeave(
      req.user.id,
      dto,
    );
  }

  @Get('my')
  @Permissions('LEAVE_VIEW')
  @ApiOperation({
    summary: 'Get My Leave Requests',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns all leave requests of logged-in user',
  })
  async getMyLeaves(@Req() req) {
    return this.leavesService.getMyLeaves(
      req.user.id,
    );
  }

  @Get('team')
  @Permissions('LEAVE_VIEW')
  @ApiOperation({
    summary: 'Get Team Leave Requests',
    description:
      'Managers can view leave requests of employees assigned to them',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns team leave requests',
  })
  async getTeamLeaves(
    @Req() req,
  ) {
    return this.leavesService.getTeamLeaves(
      req.user.id,
    );
  }

  @Get('all')
  @Permissions('LEAVE_VIEW')
  @ApiOperation({
    summary: 'Get All Leave Requests',
    description:
      'HR and Admin can view all leave requests',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns all leave requests',
  })
  async getAllLeaves() {
    return this.leavesService.getAllLeaves();
  }

  @Patch(':id/approve')
  @Permissions('LEAVE_APPROVE')
  @ApiOperation({
    summary: 'Approve Leave Request',
    description:
      'Manager can approve team leave requests. Admin can approve any leave request.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Leave approved successfully',
  })
  @ApiResponse({
    status: 403,
    description:
      'Access denied',
  })
  async approveLeave(
    @Param('id') leaveId: string,
    @Req() req,
    @Body() dto: LeaveActionDto,
  ) {
    return this.leavesService.approveLeave(
      leaveId,
      req.user.id,
      dto,
      // req.user.role === RoleEnum.ADMIN,
      req.user.permissions.includes(
        'LEAVE_APPROVE',
      )
    );
  }

  @Patch(':id/reject')
  @Permissions('LEAVE_REJECT')
  @ApiOperation({
    summary: 'Reject Leave Request',
    description:
      'Manager can reject team leave requests. Admin can reject any leave request.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Leave rejected successfully',
  })
  @ApiResponse({
    status: 403,
    description:
      'Access denied',
  })
  async rejectLeave(
    @Param('id') leaveId: string,
    @Req() req,
    @Body() dto: LeaveActionDto,
  ) {
    return this.leavesService.rejectLeave(
      leaveId,
      req.user.id,
      dto,
      // req.user.role === RoleEnum.ADMIN,
      req.user.permissions.includes(
        'LEAVE_REJECT',
      )

    );
  }
}