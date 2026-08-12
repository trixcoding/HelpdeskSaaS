import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/logout-button";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-700">
              Helpdesk SaaS
            </h1>

            <p className="text-sm text-gray-500">
              Welcome, {user.name}
            </p>
          </div>

          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <section>
          <h2 className="text-3xl font-bold text-slate-700">
            Dashboard
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your helpdesk workspace.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Name
            </p>

            <p className="mt-2 font-semibold text-slate-700">
              {user.name}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="mt-2 font-semibold text-slate-700">
              {user.email}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Role
            </p>

            <p className="mt-2 font-semibold text-blue-400">
              {user.role}
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Link
            href="/dashboard/tickets"
            className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-700">
              My Tickets
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              View and manage your tickets.
            </p>
          </Link>

          {(user.role === "AGENT" ||
            user.role === "ADMIN") && (
            <Link
              href="/agent"
              className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-700">
                Agent Panel
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Manage assigned tickets.
              </p>
            </Link>
          )}

          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-700">
                Admin Panel
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Manage users and the system.
              </p>
            </Link>
          )}
        </section>
      </div>
    </main>
  );
}