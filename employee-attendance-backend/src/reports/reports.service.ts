import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import * as ExcelJS from 'exceljs';

import { Attendance } from '../database/models/attendance.model';
import { LeaveRequest } from '../database/models/leave-request.model';
import { User } from '../database/models/user.model';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,

    @InjectModel(LeaveRequest)
    private readonly leaveModel: typeof LeaveRequest,

    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async generateAttendanceReport() {
    const attendance =
      await this.attendanceModel.findAll({
        include: [User],
        order: [
          ['attendanceDate', 'DESC'],
        ],
      });

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        'Attendance Report',
      );

    worksheet.columns = [
      {
        header: 'Employee',
        key: 'employee',
        width: 25,
      },
      {
        header: 'Username',
        key: 'username',
        width: 20,
      },
      {
        header: 'Date',
        key: 'date',
        width: 15,
      },
      {
        header: 'Check In',
        key: 'checkIn',
        width: 25,
      },
      {
        header: 'Check Out',
        key: 'checkOut',
        width: 25,
      },
      {
        header: 'Hours',
        key: 'hours',
        width: 12,
      },
    ];

    attendance.forEach(record => {
      worksheet.addRow({
        employee: `${record.user?.firstName} ${record.user?.lastName}`,
        username:
          record.user?.username,
        date:
          record.attendanceDate,
        checkIn:
          record.checkIn
            ? new Date(
                record.checkIn,
              ).toLocaleString()
            : '-',
        checkOut:
          record.checkOut
            ? new Date(
                record.checkOut,
              ).toLocaleString()
            : '-',
        hours:
          record.totalHours || 0,
      });
    });

    return workbook;
  }

  async generateLeaveReport() {
    const leaves =
      await this.leaveModel.findAll({
        include: [User],
        order: [
          ['createdAt', 'DESC'],
        ],
      });

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        'Leave Report',
      );

    worksheet.columns = [
      {
        header: 'Employee',
        key: 'employee',
        width: 25,
      },
      {
        header: 'Username',
        key: 'username',
        width: 20,
      },
      {
        header: 'Leave Type',
        key: 'leaveType',
        width: 20,
      },
      {
        header: 'Start Date',
        key: 'startDate',
        width: 15,
      },
      {
        header: 'End Date',
        key: 'endDate',
        width: 15,
      },
      {
        header: 'Status',
        key: 'status',
        width: 15,
      },
      {
        header: 'Remarks',
        key: 'remarks',
        width: 30,
      },
    ];

    leaves.forEach(leave => {
      worksheet.addRow({
        employee: `${leave.user?.firstName} ${leave.user?.lastName}`,
        username:
          leave.user?.username,
        leaveType:
          leave.leaveType,
        startDate:
          leave.startDate,
        endDate:
          leave.endDate,
        status:
          leave.status,
        remarks:
          leave.remarks || '-',
      });
    });

    return workbook;
  }
}