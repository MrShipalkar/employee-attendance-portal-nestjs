import {
  Injectable,
} from '@nestjs/common';

import * as nodemailer
  from 'nodemailer';

@Injectable()
export class MailService {
  private transporter =
    nodemailer.createTransport({
      host:
        process.env.MAIL_HOST,

      port:
        Number(
          process.env.MAIL_PORT,
        ),

      secure: false,

      auth: {
        user:
          process.env.MAIL_USER,

        pass:
          process.env.MAIL_PASSWORD,
      },
    });

  async sendMail(
    to: string,
    subject: string,
    html: string,
  ) {
    return this.transporter.sendMail({
      from:
        process.env.MAIL_FROM,

      to,

      subject,

      html,
    });
  }

  async sendPasswordResetMail(
    email: string,
    username: string,
    tempPassword: string,
  ) {
    return this.sendMail(
      email,

      'Temporary Password',

      `
      <h2>
        Employee Attendance Portal
      </h2>

      <p>
        Your password has been reset by an administrator.
      </p>

      <p>
        <strong>Username:</strong>
        ${username}
      </p>

      <p>
        <strong>Temporary Password:</strong>
        ${tempPassword}
      </p>

      <p>
        You will be required to change this password after login.
      </p>
      `,
    );
  }

  async sendOtpMail(
    email: string,
    otp: string,
  ) {
    return this.sendMail(
      email,

      'Password Change OTP',

      `
      <h2>
        Employee Attendance Portal
      </h2>

      <p>
        Use the OTP below to
        complete your password change.
      </p>

      <h1>${otp}</h1>

      <p>
        This OTP expires in
        10 minutes.
      </p>
    `,
    );
  }
async sendMonthlyAttendanceReport(
  email: string,
  filePath: string,
) {
  return this.transporter.sendMail({
    from:
      process.env.MAIL_FROM,

    to: email,

    subject:
      'Monthly Attendance Report',

    html: `
      <h2>
        Employee Attendance Portal
      </h2>

      <p>
        Please find attached the monthly
        attendance report.
      </p>

      <p>
        Regards,<br/>
        Attendance Portal
      </p>
    `,

    attachments: [
      {
        filename:
          'Attendance_Report.xlsx',

        path:
          filePath,
      },
    ],
  });
}
}