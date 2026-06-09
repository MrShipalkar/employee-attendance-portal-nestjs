import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../database/models/user.model';
import { Attendance } from '../database/models/attendance.model';
import { LeaveRequest } from '../database/models/leave-request.model';
import { Role } from '../database/models/role.model';
import { Op } from 'sequelize';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    @InjectModel(Role)
    private readonly roleModel: typeof Role,

    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,

    @InjectModel(LeaveRequest)
    private readonly leaveModel: typeof LeaveRequest,
  ) { }

  async getAdminDashboard() {
    const today = new Date()
      .toISOString()
      .split('T')[0];

    const totalEmployees =
      await this.userModel.count();

    const totalManagers =
      await this.userModel.count({
        include: [
          {
            model: Role,
            where: {
              name: 'MANAGER',
            },
          },
        ],
      });

    const totalHR =
      await this.userModel.count({
        include: [
          {
            model: Role,
            where: {
              name: 'HR',
            },
          },
        ],
      });

    const totalAdmins =
      await this.userModel.count({
        include: [
          {
            model: Role,
            where: {
              name: 'ADMIN',
            },
          },
        ],
      });

    const todayPresent =
      await this.attendanceModel.count({
        where: {
          attendanceDate: today,
        },
      });

    const todayAbsent =
      totalEmployees - todayPresent;

    const pendingLeaves =
      await this.leaveModel.count({
        where: {
          status: 'PENDING',
        },
      });

    const approvedLeaves =
      await this.leaveModel.count({
        where: {
          status: 'APPROVED',
        },
      });

    const rejectedLeaves =
      await this.leaveModel.count({
        where: {
          status: 'REJECTED',
        },
      });

    const attendanceTrend: {
      day: string;
      present: number;
    }[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();

      date.setDate(
        date.getDate() - i,
      );

      const formattedDate =
        date
          .toISOString()
          .split('T')[0];

      const presentCount =
        await this.attendanceModel.count({
          where: {
            attendanceDate:
              formattedDate,
          },
        });

      attendanceTrend.push({
        day:
          date.toLocaleDateString(
            'en-US',
            {
              weekday: 'short',
            },
          ),
        present:
          presentCount,
      });
    }

    return {
      totalEmployees,
      totalManagers,
      totalHR,
      totalAdmins,

      todayPresent,
      todayAbsent,

      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,

      attendanceTrend,
    };
  }

async getManagerDashboard(
  managerId: string,
) {
  const employees =
    await this.userModel.findAll({
      where: {
        managerId,
      },
    });

  const employeeIds =
    employees.map(
      employee => employee.id,
    );

  const teamMembers =
    employees.length;

  const today = new Date()
    .toISOString()
    .split('T')[0];

  const todayPresent =
    await this.attendanceModel.count({
      where: {
        userId: employeeIds,
        attendanceDate: today,
      },
    });

  const pendingLeaves =
    await this.leaveModel.count({
      where: {
        userId: employeeIds,
        status: 'PENDING',
      },
    });

  const approvedLeaves =
    await this.leaveModel.count({
      where: {
        userId: employeeIds,
        status: 'APPROVED',
      },
    });

  const rejectedLeaves =
    await this.leaveModel.count({
      where: {
        userId: employeeIds,
        status: 'REJECTED',
      },
    });

  const teamList =
    await this.userModel.findAll({
      where: {
        managerId,
      },

      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
      ],

      limit: 5,
    });

  return {
    teamMembers,

    todayPresent,

    todayAbsent:
      teamMembers - todayPresent,

    pendingLeaves,
    approvedLeaves,
    rejectedLeaves,

    teamList,
  };
}

 async getHRDashboard() {
  const adminStats =
    await this.getAdminDashboard();

  const recentLeaves =
    await this.leaveModel.findAll({
      limit: 5,

      order: [
        ['createdAt', 'DESC'],
      ],

      include: [
        {
          model: User,

          attributes: [
            'firstName',
            'lastName',
          ],
        },
      ],
    });

  return {
    totalEmployees:
      adminStats.totalEmployees,

    todayPresent:
      adminStats.todayPresent,

    todayAbsent:
      adminStats.todayAbsent,

    pendingLeaves:
      adminStats.pendingLeaves,

    approvedLeaves:
      adminStats.approvedLeaves,

    rejectedLeaves:
      adminStats.rejectedLeaves,

    recentLeaves,
  };
}
async getEmployeeDashboard(
  userId: string,
) {
  const totalAttendance =
    await this.attendanceModel.count({
      where: {
        userId,
      },
    });

  const totalLeaves =
    await this.leaveModel.count({
      where: {
        userId,
      },
    });

  const recentAttendance =
    await this.attendanceModel.findAll({
      where: {
        userId,
      },

      order: [
        ['attendanceDate', 'DESC'],
      ],

      limit: 5,
    });

  return {
    totalAttendance,
    totalLeaves,
    recentAttendance,
  };
}
}