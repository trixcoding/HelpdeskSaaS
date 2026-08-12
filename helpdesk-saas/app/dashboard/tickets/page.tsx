import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import CreateTicketForm from "@/components/create-ticket-form";

export default async function TicketsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const tickets =
    await prisma.ticket.findMany({
      where: {
        customerId: user.id,
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
            href="/dashboard"
            className="text-sm text-blue-400 hover:text-blue-500"
          >
            ← Back to dashboard
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-slate-700">
            My Tickets
          </h1>

          <p className="mt-2 text-gray-500">
            Create and manage your support tickets.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-slate-700">
            Create Ticket
          </h2>

          <CreateTicketForm />
        </section>

        <section>
          <h2 className="mb-5 text-xl font-semibold text-slate-700">
            Your Tickets
          </h2>

          {tickets.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
              <p className="text-gray-500">
                You don't have any tickets yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/dashboard/tickets/${ticket.id}`}
                  className="block rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-700">
                        {ticket.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                        {ticket.description}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-400">
                      {ticket.status}
                    </span>
                  </div>

                  <div className="mt-4 flex gap-4 text-xs text-gray-400">
                    <span>
                      Priority: {ticket.priority}
                    </span>

                    <span>
                      {ticket.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}