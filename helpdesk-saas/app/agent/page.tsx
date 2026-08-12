import { requireAgent } from "@/lib/authorization";
import LogoutButton from "@/components/logout-button";
import Link from "next/link";
export default async function AgentPage() {
  const user = await requireAgent();

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-700">
              Agent Panel
            </h1>

            <p className="text-sm text-gray-500">
              Welcome, {user.name}
            </p>
          </div>

          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-700">
            Agent Dashboard
          </h2>

          <p className="mt-2 text-gray-500">
            Manage customer tickets from here.
          </p>
        </div>
      </div>

<Link
  href="/agent/tickets"
  className="mt-6 inline-block rounded-lg bg-blue-400 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
>
  View Tickets
</Link>
    </main>
  );
}