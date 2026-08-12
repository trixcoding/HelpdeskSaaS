import "dotenv/config";

import { Worker } from "bullmq";

import IORedis from "ioredis";

import { Resend } from "resend";

import {
  newTicketEmail,
} from "../emails/new-ticket";

import type {
  EmailJob,
} from "../queues/email.queue";

const redis =
  new IORedis(
    process.env.REDIS_URL!,
    {
      maxRetriesPerRequest: null,
    },
  );

const resend =
  new Resend(
    process.env.RESEND_API_KEY,
  );

const worker =
  new Worker<EmailJob>(
    "email",

    async (job) => {
      console.log(
        `Processing job ${job.id}`,
      );

      if (
        job.data.type ===
        "NEW_TICKET"
      ) {
        const {
          customerName,
          customerEmail,
          title,
          description,
        } = job.data;

        const html =
          newTicketEmail({
            customerName,
            title,
            description,
          });

        await resend.emails.send({
          from:
            process.env.EMAIL_FROM!,

          to: customerEmail,

          subject:
            `Ticket Created: ${title}`,

          html,
        });
      }
    },

    {
      connection: redis,

      concurrency: 5,
    },
  );

worker.on(
  "completed",
  (job) => {
    console.log(
      `Job ${job.id} completed`,
    );
  },
);

worker.on(
  "failed",
  (job, error) => {
    console.error(
      `Job ${job?.id} failed:`,
      error,
    );
  },
);

console.log(
  "Email worker started",
);