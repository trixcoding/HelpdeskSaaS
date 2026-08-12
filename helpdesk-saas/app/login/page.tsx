import Link from "next/link";

import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
            <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                              <h1 className="text-3xl font-bold text-slate-700">
                                          Welcome back
                                                    </h1>

                                                              <p className="mt-2 text-gray-500">
                                                                          Login to your Helpdesk account
                                                                                    </p>
                                                                                            </div>

                                                                                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                                                                                              <LoginForm />
                                                                                                                      </div>

                                                                                                                              <p className="mt-6 text-center text-sm text-gray-500">
                                                                                                                                        Don't have an account?{" "}
                                                                                                                                                  <Link
                                                                                                                                                              href="/register"
                                                                                                                                                                          className="font-medium text-blue-400 hover:text-blue-500"
                                                                                                                                                                                    >
                                                                                                                                                                                                Register
                                                                                                                                                                                                          </Link>
                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                              );
                                                                                                                                                                                                                              }