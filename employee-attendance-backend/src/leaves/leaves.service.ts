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
import { LeaveBalance } from '../database/models/leave-balance.model';

@Injectable()
export class LeavesService {
  constructor(
    @InjectModel(LeaveRequest)
    private readonly leaveModel: typeof LeaveRequest,

    @InjectModel(LeaveBalance)
    private readonly leaveBalanceModel: typeof LeaveBalance,

    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

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

    const balance =
      await this.leaveBalanceModel.findOne({
        where: {
          userId: leave.userId,
        },
      });

    if (!balance) {
      throw new NotFoundException(
        'Leave balance not found',
      );
    }

    const startDate =
      new Date(
        leave.startDate,
      );

    const endDate =
      new Date(
        leave.endDate,
      );

    const leaveDays =
      Math.floor(
        (
          endDate.getTime() -
          startDate.getTime()
        ) /
        (1000 * 60 * 60 * 24),
      ) + 1;

    switch (
    leave.leaveType
    ) {
      case 'SICK':
        if (
          balance.sickLeave <
          leaveDays
        ) {
          throw new BadRequestException(
            `Only ${balance.sickLeave} sick leave(s) remaining`,
          );
        }

        balance.sickLeave -=
          leaveDays;
        break;

      case 'CASUAL':
        if (
          balance.casualLeave <
          leaveDays
        ) {
          throw new BadRequestException(
            `Only ${balance.casualLeave} casual leave(s) remaining`,
          );
        }

        balance.casualLeave -=
          leaveDays;
        break;

      case 'EARNED':
        if (
          balance.earnedLeave <
          leaveDays
        ) {
          throw new BadRequestException(
            `Only ${balance.earnedLeave} earned leave(s) remaining`,
          );
        }

        balance.earnedLeave -=
          leaveDays;
        break;
    }

    await balance.save();

    const start =
      new Date(
        leave.startDate,
      );

    const end =
      new Date(
        leave.endDate,
      );

    const totalDays =
      Math.floor(
        (
          end.getTime() -
          start.getTime()
        ) /
        (1000 *
          60 *
          60 *
          24),
      ) + 1;

    switch (
    leave.leaveType
    ) {
      case 'SICK':
        if (
          balance.sickLeave <
          totalDays
        ) {
          throw new BadRequestException(
            'Insufficient Sick Leave balance',
          );
        }

        balance.sickLeave -=
          totalDays;
        break;

      case 'CASUAL':
        if (
          balance.casualLeave <
          totalDays
        ) {
          throw new BadRequestException(
            'Insufficient Casual Leave balance',
          );
        }

        balance.casualLeave -=
          totalDays;
        break;

      case 'EARNED':
        if (
          balance.earnedLeave <
          totalDays
        ) {
          throw new BadRequestException(
            'Insufficient Earned Leave balance',
          );
        }

        balance.earnedLeave -=
          totalDays;
        break;
    }

    await balance.save();

    await leave.update({
      status:
        LeaveStatus.APPROVED,
      approvedBy:
        approverId,
      remarks:
        dto.remarks || null,
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

  async getLeaveBalance(
    userId: string,
  ) {
    const balance =
      await this.leaveBalanceModel.findOne({
        where: {
          userId,
        },
      });

    if (!balance) {
      throw new NotFoundException(
        'Leave balance not found',
      );
    }

    return balance;
  }

  async getMyLeaveBalance(
    userId: string,
  ) {
    const balance =
      await this.leaveBalanceModel.findOne({
        where: {
          userId,
        },
      });

    if (!balance) {
      throw new NotFoundException(
        'Leave balance not found',
      );
    }

    return balance;
  }

}