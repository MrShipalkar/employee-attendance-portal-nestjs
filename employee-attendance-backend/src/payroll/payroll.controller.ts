import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { PayrollService } from './payroll.service';

import { CreateSalaryStructureDto } from './dto/create-salary-structure.dto';
import { UpdateSalaryStructureDto } from './dto/update-salary-structure.dto';
import { GeneratePayrollDto } from './dto/generate-payroll.dto';
import {
    Res,
} from '@nestjs/common';

import type { Response } from 'express';

@Controller('payroll')
export class PayrollController {
    constructor(
        private readonly payrollService: PayrollService,
    ) { }

    @Post('salary-structure')
    createSalaryStructure(
        @Body()
        dto: CreateSalaryStructureDto,
    ) {
        return this.payrollService.createSalaryStructure(
            dto,
        );
    }

    @Get('salary-structure/:employeeId')
    getSalaryStructure(
        @Param('employeeId')
        employeeId: string,
    ) {
        return this.payrollService.getSalaryStructure(
            employeeId,
        );
    }

    @Put('salary-structure/:employeeId')
    updateSalaryStructure(
        @Param('employeeId')
        employeeId: string,

        @Body()
        dto: UpdateSalaryStructureDto,
    ) {
        return this.payrollService.updateSalaryStructure(
            employeeId,
            dto,
        );
    }

    @Delete('salary-structure/:employeeId')
    deleteSalaryStructure(
        @Param('employeeId')
        employeeId: string,
    ) {
        return this.payrollService.deleteSalaryStructure(
            employeeId,
        );
    }

    @Post('generate')
    generatePayroll(
        @Body()
        dto: GeneratePayrollDto,
    ) {
        return this.payrollService.generatePayroll(
            dto,
        );
    }

    @Get()
    getAllPayrolls() {
        return this.payrollService.getAllPayrolls();
    }

    @Get('employee/:employeeId')
    getEmployeePayrolls(
        @Param('employeeId')
        employeeId: string,
    ) {
        return this.payrollService.getEmployeePayrolls(
            employeeId,
        );
    }

    @Get(':id')
    getPayrollById(
        @Param('id')
        id: string,
    ) {
        return this.payrollService.getPayrollById(id);
    }

    @Get(':id/payslip')
async downloadPayslip(
  @Param('id')
  id: string,

  @Res()
  res: Response,
) {
  const pdf =
    await this.payrollService.getPayslip(id);

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition':
      `attachment; filename=payslip-${id}.pdf`,
  });

  res.end(pdf);
}
}