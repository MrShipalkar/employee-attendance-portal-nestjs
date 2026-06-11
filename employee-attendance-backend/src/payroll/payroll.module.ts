import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';

import { EmployeeSalary } from '../database/models/employee-salary.model';
import { Payroll } from '../database/models/payroll.model';
import { User } from '../database/models/user.model';
import { Attendance } from '../database/models/attendance.model';
import { PayslipPdfService } from './services/payslip-pdf.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      EmployeeSalary,
      Payroll,
      User,
      Attendance,
    ]),
  ],
  controllers: [PayrollController],
  providers: [PayrollService,
    PayslipPdfService,
  ],
  exports: [PayrollService],
})
export class PayrollModule { }