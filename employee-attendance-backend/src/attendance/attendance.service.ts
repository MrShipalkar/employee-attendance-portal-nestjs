import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { Attendance } from '../database/models/attendance.model';
import { User } from '../database/models/user.model';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,

    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async checkIn(userId: string) {
    const today = new Date()
      .toISOString()
      .split('T')[0];

    const existingAttendance =
      await this.attendanceModel.findOne({
        where: {
          userId,
          attendanceDate: today,
        },
      });

    if (existingAttendance) {
      throw new BadRequestException(
        'Already checked in today',
      );
    }

    const attendance =
      await this.attendanceModel.create({
        userId,
        attendanceDate: today as any,
        checkIn: new Date(),
      } as any);

    return {
      message: 'Check-in successful',
      attendance,
    };
  }

  async checkOut(userId: string) {
    const today = new Date()
      .toISOString()
      .split('T')[0];

    const attendance =
      await this.attendanceModel.findOne({
        where: {
          userId,
          attendanceDate: today,
        },
      });

    if (!attendance) {
      throw new BadRequestException(
        'Check-in not found for today',
      );
    }

    if (attendance.checkOut) {
      throw new BadRequestException(
        'Already checked out',
      );
    }

    const checkOutTime = new Date();

    const totalHours =
      (
        (checkOutTime.getTime() -
          new Date(
            attendance.checkIn,
          ).getTime()) /
        (1000 * 60 * 60)
      ).toFixed(2);

    await attendance.update({
      checkOut: checkOutTime,
      totalHours: Number(totalHours),
    });

    return {
      message: 'Check-out successful',
      attendance,
    };
  }

  async getMyAttendance(
    userId: string,
  ) {
    return this.attendanceModel.findAll({
      where: {
        userId,
      },
      order: [['attendanceDate', 'DESC']],
    });
  }

  async getTeamAttendance(
    managerId: string,
  ) {
    const employees =
      await this.userModel.findAll({
        where: {
          managerId,
        },
      });

    const employeeIds =
      employees.map((emp) => emp.id);

    return this.attendanceModel.findAll({
      where: {
        userId: employeeIds,
      },
      include: [User],
      order: [['attendanceDate', 'DESC']],
    });
  }

  async getAllAttendance() {
    return this.attendanceModel.findAll({
      include: [User],
      order: [['attendanceDate', 'DESC']],
    });
  }
}