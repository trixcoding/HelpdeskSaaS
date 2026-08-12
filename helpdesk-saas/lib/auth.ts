import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "helpdesk_session";

export async function createSession(userId: string) {
  const token = crypto.randomUUID();

    const expiresAt = new Date();

      expiresAt.setDate(expiresAt.getDate() + 7);

        await prisma.session.create({
            data: {
                  token,
                        userId,
                              expiresAt,
                                  },
                                    });

                                      const cookieStore = await cookies();

                                        cookieStore.set(SESSION_COOKIE, token, {
                                            httpOnly: true,
                                                secure: process.env.NODE_ENV === "production",
                                                    sameSite: "lax",
                                                        expires: expiresAt,
                                                            path: "/",
                                                              });
                                                              }

                                                              export async function getCurrentUser() {
                                                                const cookieStore = await cookies();

                                                                  const token = cookieStore.get(
                                                                      SESSION_COOKIE
                                                                        )?.value;

                                                                          if (!token) {
                                                                              return null;
                                                                                }

                                                                                  const session = await prisma.session.findUnique({
                                                                                      where: {
                                                                                            token,
                                                                                                },
                                                                                                    include: {
                                                                                                          user: true,
                                                                                                              },
                                                                                                                });

                                                                                                                  if (!session) {
                                                                                                                      return null;
                                                                                                                        }

                                                                                                                          if (session.expiresAt < new Date()) {
                                                                                                                              await prisma.session.delete({
                                                                                                                                    where: {
                                                                                                                                            id: session.id,
                                                                                                                                                  },
                                                                                                                                                      });

                                                                                                                                                          return null;
                                                                                                                                                            }

                                                                                                                                                              return session.user;
                                                                                                                                                              }

                                                                                                                                                              export async function deleteSession() {
                                                                                                                                                                const cookieStore = await cookies();

                                                                                                                                                                  const token = cookieStore.get(
                                                                                                                                                                      SESSION_COOKIE
                                                                                                                                                                        )?.value;

                                                                                                                                                                          if (token) {
                                                                                                                                                                              await prisma.session.deleteMany({
                                                                                                                                                                                    where: {
                                                                                                                                                                                            token,
                                                                                                                                                                                                  },
                                                                                                                                                                                                      });
                                                                                                                                                                                                        }

                                                                                                                                                                                                          cookieStore.delete(SESSION_COOKIE);
                                                                                                                                                                                                          }