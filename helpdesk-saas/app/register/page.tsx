import Link from "next/link";

import RegisterForm from "@/components/register-form";

export default function RegisterPage() {
  return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
            <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                              <h1 className="text-3xl font-bold text-slate-700">
                                          Create account
                                                    </h1>

                                                              <p className="mt-2 text-gray-500">
                                                                          Create your Helpdesk account
                                                                                    </p>
                                                                                            </div>

                                                                                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                                                                                              <RegisterForm />
                                                                                                                      </div>

                                                                                                                              <p className="mt-6 text-center text-sm text-gray-500">
                                                                                                                                        Already have an account?{" "}
                                                                                                                                                  <Link
                                                                                                                                                              href="/login"
                                                                                                                                                                          className="font-medium text-blue-400 hover:text-blue-500"
                                                                                                                                                                                    >
                                                                                                                                                                                                Login
                                                                                                                                                                                                          </Link>
                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                              );
                                                                                                                                                                                                                              }