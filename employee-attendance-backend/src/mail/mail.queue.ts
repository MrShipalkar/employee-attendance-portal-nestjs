import { Queue } from 'bullmq';

export const mailQueue =
  new Queue(
    'mail-queue',
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