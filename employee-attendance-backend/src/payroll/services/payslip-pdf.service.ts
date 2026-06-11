import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';

@Injectable()
export class PayslipPdfService {
  generatePayslip(
    payroll: any,
    employee: any,
    salary: any,
  ): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
      });

      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });

      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

      // =========================
      // COMPANY HEADER
      // =========================

      doc
        .fontSize(22)
        .text(
          'Khushi Innoventures Pvt Ltd',
          {
            align: 'center',
          },
        );

      doc
        .fontSize(16)
        .text(
          'EMPLOYEE PAYSLIP',
          {
            align: 'center',
          },
        );

      doc
        .fontSize(12)
        .text(
          `${payroll.month}/${payroll.year}`,
          {
            align: 'center',
          },
        );

      doc.moveDown(2);

      // =========================
      // EMPLOYEE DETAILS
      // =========================

      doc
        .fontSize(14)
        .text('Employee Details');

      doc.moveDown(0.5);

      doc.text(
        `Employee Name : ${employee.firstName} ${employee.lastName}`,
      );

      doc.text(
        `Email : ${employee.email}`,
      );

      doc.text(
        `Employee ID : ${employee.id}`,
      );

      doc.text(
        `Payroll Month : ${payroll.month}/${payroll.year}`,
      );

      doc.moveDown();

      doc.text(
        `Working Days : ${payroll.workingDays}`,
      );

      doc.text(
        `Present Days : ${payroll.presentDays}`,
      );

      doc.text(
        `Absent Days : ${payroll.absentDays}`,
      );

      doc.moveDown(2);

      // =========================
      // EARNINGS TABLE
      // =========================

      doc
        .fontSize(14)
        .text('EARNINGS');

      doc.moveDown();

      doc.text(
        '------------------------------------------------------------',
      );

      doc.text(
        'Component                              Amount (₹)',
      );

      doc.text(
        '------------------------------------------------------------',
      );

      doc.text(
        `Basic Salary                          ${salary.basicSalary}`,
      );

      doc.text(
        `HRA                                   ${salary.hra}`,
      );

      doc.text(
        `DA                                    ${salary.da}`,
      );

      doc.text(
        `Special Allowance                     ${salary.specialAllowance}`,
      );

      doc.text(
        `Bonus                                 ${salary.bonus}`,
      );

      doc.text(
        '------------------------------------------------------------',
      );

      doc.text(
        `Gross Salary                          ${payroll.grossSalary}`,
      );

      doc.moveDown(2);

      // =========================
      // DEDUCTIONS TABLE
      // =========================

      doc
        .fontSize(14)
        .text('DEDUCTIONS');

      doc.moveDown();

      doc.text(
        '------------------------------------------------------------',
      );

      doc.text(
        'Component                              Amount (₹)',
      );

      doc.text(
        '------------------------------------------------------------',
      );

      doc.text(
        `PF Deduction                          ${salary.pfDeduction}`,
      );

      doc.text(
        `Professional Tax                      ${salary.professionalTax}`,
      );

      doc.text(
        `TDS                                   ${salary.tds}`,
      );

      doc.text(
        `Absent Deduction                      ${payroll.absentDeduction ?? 0}`,
      );

      doc.text(
        '------------------------------------------------------------',
      );

      doc.text(
        `Total Deductions                      ${payroll.deductions}`,
      );

      doc.moveDown(2);

      // =========================
      // NET SALARY
      // =========================

      doc
        .fontSize(18)
        .text(
          `NET SALARY : ₹ ${payroll.netSalary}`,
          {
            align: 'right',
          },
        );

      doc.moveDown(4);

      // =========================
      // FOOTER
      // =========================

      doc.text(
        `Generated On : ${new Date().toLocaleDateString()}`,
      );

      doc.moveDown(2);

      doc.text(
        'Authorized Signature',
        {
          align: 'right',
        },
      );

      doc.text(
        '_____________________',
        {
          align: 'right',
        },
      );

      doc.end();
    });
  }
}