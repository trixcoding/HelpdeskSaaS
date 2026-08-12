import { Queue } from "bullmq";

import { redis } from "@/lib/redis";

export type NewTicketEmailJob = {
  type: "NEW_TICKET";

  ticketId: string;

  customerName: string;
  customerEmail: string;

  title: string;
  description: string;
};

export type NewReplyEmailJob = {
  type: "NEW_REPLY";

  ticketId: string;

  recipientEmail: string;
  recipientName: string;

  ticketTitle: string;
  comment: string;
  authorName: string;
};

export type EmailJob =
  | NewTicketEmailJob
  | NewReplyEmailJob;

export const emailQueue =
  new Queue<EmailJob>("email", {
    connection: redis,

    defaultJobOptions: {
      attempts: 3,

      backoff: {
        type: "exponential",
        delay: 2000,
      },

      removeOnComplete: 100,

      removeOnFail: 500,
    },
  });