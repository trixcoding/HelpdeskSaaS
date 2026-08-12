import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TicketPage({
  params,
}: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const ticket =
    await prisma.ticket.findFirst({
      where: {
        id,
        customerId: user.id,
      },

      include: {
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },

          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

  if (!ticket) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <Link
            href="/dashboard/tickets"
            className="text-sm text-blue-400 hover:text-blue-500"
          >
            ← Back to tickets
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-6 px-6 py-10">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-400">
                Ticket
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-700">
                {ticket.title}
              </h1>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-400">
              {ticket.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                Priority
              </p>

              <p className="mt-1 font-medium text-slate-700">
                {ticket.priority}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-400">
                Created
              </p>

              <p className="mt-1 font-medium text-slate-700">
                {ticket.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Description
            </p>

            <div className="rounded-xl bg-gray-50 p-5 whitespace-pre-wrap text-gray-600">
              {ticket.description}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700">
            Conversation
          </h2>

          {ticket.comments.length === 0 ? (
            <p className="mt-6 text-sm text-gray-500">
              No replies yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {ticket.comments.map(
                (comment) => (
                  <div
                    key={comment.id}
                    className="rounded-xl bg-gray-50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-700">
                        {comment.user.name}
                      </p>

                      <span className="text-xs text-gray-400">
                        {comment.user.role}
                      </span>
                    </div>

                    <p className="mt-3 whitespace-pre-wrap text-gray-600">
                      {comment.content}
                    </p>
                  </div>
                ),
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}