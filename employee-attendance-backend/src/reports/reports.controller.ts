import {
  Controller,
  Get,
  Res,
  UseGuards,
} from '@nestjs/common';

import type { Response } from 'express';

import { ReportsService } from './reports.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SessionGuard } from '../common/guards/session.guard';

@Controller('reports')
@UseGuards(
  JwtAuthGuard,
  SessionGuard,
)
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Get('attendance/download')
  async downloadAttendance(
    @Res() res: Response,
  ) {
    const workbook =
      await this.reportsService.generateAttendanceReport();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Attendance_Report.xlsx`,
    );

    await workbook.xlsx.write(
      res,
    );

    res.end();
  }

  @Get('leaves/download')
  async downloadLeaves(
    @Res() res: Response,
  ) {
    const workbook =
      await this.reportsService.generateLeaveReport();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Leave_Report.xlsx`,
    );

    await workbook.xlsx.write(
      res,
    );

    res.end();
  }
}