import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { LeaveRequest } from '../database/models/leave-request.model';
import { User } from '../database/models/user.model';

import { ApplyLeaveDto } from './dto/apply-leave.dto';
import { LeaveActionDto } from './dto/leave-action.dto';

import { LeaveStatus } from '../common/enums/leave-status.enum';

@Injectable()
export class LeavesService {
  constructor(
    @InjectModel(LeaveRequest)
    private readonly leaveModel: typeof LeaveRequest,

    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async applyLeave(
    userId: string,
    dto: ApplyLeaveDto,
  ) {
    if (
      new Date(dto.endDate) <
      new Date(dto.startDate)
    ) {
      throw new BadRequestException(
        'End date cannot be before start date',
      );
    }

    const leave =
      await this.leaveModel.create({
        userId,
        startDate: dto.startDate as any,
        endDate: dto.endDate as any,
        leaveType: dto.leaveType,
        reason: dto.reason,
        status: LeaveStatus.PENDING,
      } as any);

    return {
      message:
        'Leave request submitted successfully',
      leave,
    };
  }

  async getMyLeaves(userId: string) {
    return this.leaveModel.findAll({
      where: {
        userId,
      },
      order: [['createdAt', 'DESC']],
    });
  }

  async getTeamLeaves(managerId: string) {
    const employees =
      await this.userModel.findAll({
        where: {
          managerId,
        },
      });

    const employeeIds =
      employees.map((e) => e.id);

    return this.leaveModel.findAll({
      where: {
        userId: employeeIds,
      },
      include: [User],
      order: [['createdAt', 'DESC']],
    });
  }

  async getAllLeaves() {
    return this.leaveModel.findAll({
      include: [User],
      order: [['createdAt', 'DESC']],
    });
  }

  async approveLeave(
    leaveId: string,
    approverId: string,
    dto: LeaveActionDto,
    isAdmin = false,
  ) {
    const leave =
      await this.leaveModel.findByPk(
        leaveId,
      );

    if (!leave) {
      throw new NotFoundException(
        'Leave request not found',
      );
    }

    if (
      leave.status ===
      LeaveStatus.APPROVED
    ) {
      throw new BadRequestException(
        'Leave already approved',
      );
    }

    const employee =
      await this.userModel.findByPk(
        leave.userId,
      );

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    if (
      !isAdmin &&
      employee.managerId !== approverId
    ) {
      throw new ForbiddenException(
        'You can only approve leaves of your team members',
      );
    }

    await leave.update({
      status: LeaveStatus.APPROVED,
      approvedBy: approverId,
      remarks: dto.remarks || null,
    });

    return {
      message:
        'Leave approved successfully',
      leave,
    };
  }

  async rejectLeave(
    leaveId: string,
    approverId: string,
    dto: LeaveActionDto,
    isAdmin = false,
  ) {
    const leave =
      await this.leaveModel.findByPk(
        leaveId,
      );

    if (!leave) {
      throw new NotFoundException(
        'Leave request not found',
      );
    }

    if (
      leave.status ===
      LeaveStatus.REJECTED
    ) {
      throw new BadRequestException(
        'Leave already rejected',
      );
    }

    const employee =
      await this.userModel.findByPk(
        leave.userId,
      );

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    if (
      !isAdmin &&
      employee.managerId !== approverId
    ) {
      throw new ForbiddenException(
        'You can only reject leaves of your team members',
      );
    }

    await leave.update({
      status: LeaveStatus.REJECTED,
      approvedBy: approverId,
      remarks: dto.remarks || null,
    });

    return {
      message:
        'Leave rejected successfully',
      leave,
    };
  }
}