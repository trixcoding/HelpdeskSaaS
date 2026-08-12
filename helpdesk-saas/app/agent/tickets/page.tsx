import Link from "next/link";

import { requireAgent } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

export default async function AgentTicketsPage() {
  const user = await requireAgent();

  const tickets =
    await prisma.ticket.findMany({
      where:
        user.role === "ADMIN"
          ? {}
          : {
              OR: [
                {
                  agentId: user.id,
                },
                {
                  agentId: null,
                },
              ],
            },

      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },

        agent: {
          select: {
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link
            href="/agent"
            className="text-sm text-blue-400"
          >
            ← Agent Dashboard
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-slate-700">
            Tickets
          </h1>

          <p className="mt-2 text-gray-500">
            Manage customer support tickets.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {tickets.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
            No tickets found.
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/agent/tickets/${ticket.id}`}
                className="block rounded-xl border bg-white p-5 transition hover:border-blue-400 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-slate-700">
                      {ticket.title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Customer:{" "}
                      {ticket.customer.name}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-400">
                    {ticket.status}
                  </span>
                </div>

                <div className="mt-4 flex gap-4 text-xs text-gray-400">
                  <span>
                    Priority: {ticket.priority}
                  </span>

                  <span>
                    Agent:{" "}
                    {ticket.agent?.name ??
                      "Unassigned"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}