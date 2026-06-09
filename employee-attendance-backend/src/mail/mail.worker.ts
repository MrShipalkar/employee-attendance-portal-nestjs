import { Worker } from 'bullmq';

import { MailService }
  from './mail.service';

const mailService =
  new MailService();

export const mailWorker =
  new Worker(
    'mail-queue',

    async job => {
      if (
        job.name ===
        'password-reset'
      ) {
        await mailService.sendPasswordResetMail(
          job.data.email,
          job.data.username,
          job.data.tempPassword,
        );
      }
    },

    {
      connection: {
        host:
          process.env.REDIS_HOST,

        port:
          Number(
            process.env.REDIS_PORT,
          ),
      },
    },
  );