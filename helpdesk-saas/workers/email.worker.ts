import "dotenv/config";

import { Worker } from "bullmq";

import { redis } from "@/lib/redis";
import { resend } from "@/lib/email";

import {
  type EmailJob,
} from "@/queues/email.queue";

import {
  newTicketEmail,
} from "@/emails/new-ticket";

const worker =
  new Worker<EmailJob>(
    "email",

    async (job) => {
      console.log(
        `Processing job: ${job.id}`,
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

        const result =
          await resend.emails.send({
            from:
              process.env.EMAIL_FROM!,

            to: customerEmail,

            subject:
              `Ticket Created: ${title}`,

            html,
          });

        console.log(
          "Email sent:",
          result,
        );
      }

      if (
        job.data.type ===
        "NEW_REPLY"
      ) {
        console.log(
          "NEW_REPLY is not implemented yet.",
        );
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
      `Job ${job?.id} failed`,
      error,
    );
  },
);

console.log(
  "Email worker started...",
);