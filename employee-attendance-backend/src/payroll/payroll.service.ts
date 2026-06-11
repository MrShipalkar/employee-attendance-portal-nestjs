import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';

import {
    InjectModel,
} from '@nestjs/sequelize';

import { EmployeeSalary } from '../database/models/employee-salary.model';

import { CreateSalaryStructureDto } from './dto/create-salary-structure.dto';
import { UpdateSalaryStructureDto } from './dto/update-salary-structure.dto';
import { Op } from 'sequelize';
import { Payroll } from '../database/models/payroll.model';
import { Attendance } from '../database/models/attendance.model';
import { GeneratePayrollDto } from './dto/generate-payroll.dto';
import { User } from '../database/models/user.model';
import { PayslipPdfService } from './services/payslip-pdf.service';

@Injectable()
export class PayrollService {
    constructor(
        @InjectModel(EmployeeSalary)
        private readonly employeeSalaryModel: typeof EmployeeSalary,

        @InjectModel(Payroll)
        private readonly payrollModel: typeof Payroll,

        @InjectModel(Attendance)
        private readonly attendanceModel: typeof Attendance,

        @InjectModel(User)
        private readonly userModel: typeof User,

        private readonly payslipPdfService: PayslipPdfService,
    ) { }

   async createSalaryStructure(
  dto: CreateSalaryStructureDto,
) {
  const existingSalary =
    await this.employeeSalaryModel.findOne({
      where: {
        employeeId: dto.employeeId,
      },
    });

  if (existingSalary) {
    throw new ConflictException(
      'Salary structure already exists for this employee',
    );
  }

  return this.employeeSalaryModel.create(
    dto as any,
  );
}

    async getSalaryStructure(
        employeeId: string,
    ) {
        const salary =
            await this.employeeSalaryModel.findOne({
                where: {
                    employeeId,
                },
            });

        if (!salary) {
            throw new NotFoundException(
                'Salary structure not found',
            );
        }

        return salary;
    }

    async updateSalaryStructure(
        employeeId: string,
        dto: UpdateSalaryStructureDto,
    ) {
        const salary =
            await this.employeeSalaryModel.findOne({
                where: {
                    employeeId,
                },
            });

        if (!salary) {
            throw new NotFoundException(
                'Salary structure not found',
            );
        }

        await salary.update(
            dto as any,
        );

        return salary;
    }

    async deleteSalaryStructure(
        employeeId: string,
    ) {
        const salary =
            await this.employeeSalaryModel.findOne({
                where: {
                    employeeId,
                },
            });

        if (!salary) {
            throw new NotFoundException(
                'Salary structure not found',
            );
        }

        await salary.destroy();

        return {
            message:
                'Salary structure deleted successfully',
        };
    }

    async generatePayroll(
        dto: GeneratePayrollDto,
    ) {
        const salaryStructure =
            await this.employeeSalaryModel.findOne({
                where: {
                    employeeId: dto.employeeId,
                },
            });

        if (!salaryStructure) {
            throw new NotFoundException(
                'Salary structure not found',
            );
        }

        const startDate = new Date(
            dto.year,
            dto.month - 1,
            1,
        );

        const endDate = new Date(
            dto.year,
            dto.month,
            0,
        );

        const presentDays =
            await this.attendanceModel.count({
                where: {
                    userId: dto.employeeId,
                    attendanceDate: {
                        [Op.between]: [
                            startDate,
                            endDate,
                        ],
                    },
                },
            });

        const workingDays =
            endDate.getDate();

        const absentDays =
            Math.max(
                workingDays - presentDays,
                0,
            );

        const grossSalary =
            Number(salaryStructure.basicSalary) +
            Number(salaryStructure.hra) +
            Number(salaryStructure.da) +
            Number(salaryStructure.specialAllowance) +
            Number(salaryStructure.bonus);

        const perDaySalary =
            grossSalary / workingDays;

        const absentDeduction =
            perDaySalary * absentDays;

        const deductions =
            absentDeduction +
            Number(salaryStructure.pfDeduction) +
            Number(salaryStructure.professionalTax) +
            Number(salaryStructure.tds);

        const netSalary =
            grossSalary - deductions;

        const payroll =
            await this.payrollModel.create({
                employeeId: dto.employeeId,
                month: dto.month,
                year: dto.year,
                workingDays,
                presentDays,
                absentDays,
                grossSalary,

                absentDeduction,

                deductions,
                netSalary,

                status: 'GENERATED',
            } as any);

        return payroll;
    }



    async getAllPayrolls() {
        return this.payrollModel.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'email',
                    ],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    }

    async getPayrollById(
        id: string,
    ) {
        const payroll =
            await this.payrollModel.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: [
                            'id',
                            'firstName',
                            'lastName',
                            'email',
                        ],
                    },
                ],
            });

        if (!payroll) {
            throw new NotFoundException(
                'Payroll not found',
            );
        }

        return payroll;
    }

    async getEmployeePayrolls(
        employeeId: string,
    ) {
        return this.payrollModel.findAll({
            where: {
                employeeId,
            },
            order: [
                ['year', 'DESC'],
                ['month', 'DESC'],
            ],
        });
    }

    async getPayslip(
        payrollId: string,
    ) {
        const payroll =
            await this.payrollModel.findByPk(
                payrollId,
                {
                    include: [User],
                },
            );

        if (!payroll) {
            throw new NotFoundException(
                'Payroll not found',
            );
        }

        const salaryStructure =
            await this.employeeSalaryModel.findOne({
                where: {
                    employeeId: payroll.employeeId,
                },
            });

        if (!salaryStructure) {
            throw new NotFoundException(
                'Salary structure not found',
            );
        }

        return await this.payslipPdfService.generatePayslip(
            payroll,
            payroll.employee,
            salaryStructure,
        );
    }

    async getAllSalaryStructures() {
        return this.employeeSalaryModel.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        'firstName',
                        'lastName',
                        'email',
                    ],
                },
            ],
        });
    }
}