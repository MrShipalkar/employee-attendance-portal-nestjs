import {
    Injectable,
    Logger,
} from '@nestjs/common';

import { Cron } from '@nestjs/schedule';

import { ReportsService } from '../reports/reports.service';
import * as fs from 'fs';
import * as path from 'path';

import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MonthlyReportCron {
    private readonly logger =
        new Logger(
            MonthlyReportCron.name,
        );

    constructor(
        private readonly reportsService: ReportsService,

        private readonly usersService: UsersService,

        private readonly mailService: MailService,
    ) { }

    @Cron('0 0 23 * * *')
    // @Cron('0 * * * * *')
    async sendMonthlyAttendanceReport() {
        const today =
            new Date();

        const tomorrow =
            new Date(today);

        tomorrow.setDate(
            today.getDate() + 1,
        );

        const isLastDay =
            tomorrow.getMonth() !==
            today.getMonth();
        // const isLastDay = true;

        if (!isLastDay) {
            return;
        }

        this.logger.log(
            'Last day of month detected.',
        );

        const workbook =
            await this.reportsService.generateAttendanceReport();

        const reportsDir =
            path.join(
                process.cwd(),
                'uploads',
                'reports',
            );

        if (
            !fs.existsSync(
                reportsDir,
            )
        ) {
            fs.mkdirSync(
                reportsDir,
                {
                    recursive: true,
                },
            );
        }

        const filePath =
            path.join(
                reportsDir,
                `Attendance_Report_${today.getFullYear()}_${today.getMonth() + 1}.xlsx`,
            );

        await workbook.xlsx.writeFile(
            filePath,
        );

        const hrUsers =
            await this.usersService.getHrUsers();

        for (const hr of hrUsers) {
            await this.mailService.sendMonthlyAttendanceReport(
                hr.email,
                filePath,
            );

            this.logger.log(
                `Report mailed to ${hr.email}`,
            );
        }

        fs.unlinkSync(
            filePath,
        );

        this.logger.log(
            'Monthly attendance report completed.',
        );
    }
}