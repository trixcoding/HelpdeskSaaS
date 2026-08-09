import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const users = await prisma.user.count();

    return (
        <main className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                      <h1 className="text-4xl font-bold">
                                Helpdesk SaaS
                                        </h1>

                                                <p className="mt-4 text-gray-500">
                                                          Users in database: {users}
                                                                  </p>
                                                                        </div>
                                                                            </main>
                                                                              );
                                                                              }