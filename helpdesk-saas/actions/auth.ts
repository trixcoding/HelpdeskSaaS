"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import {
  createSession,
    deleteSession,
    } from "@/lib/auth";

    const registerSchema = z.object({
      name: z
          .string()
              .trim()
                  .min(2, "Name must be at least 2 characters.")
                      .max(50),

                        email: z
                            .string()
                                .trim()
                                    .email("Invalid email address."),

                                      password: z
                                          .string()
                                              .min(8, "Password must be at least 8 characters.")
                                                  .max(100),
                                                  });

                                                  export async function registerAction(
                                                    formData: FormData
                                                    ) {
                                                      const result = registerSchema.safeParse({
                                                          name: formData.get("name"),
                                                              email: formData.get("email"),
                                                                  password: formData.get("password"),
                                                                    });

                                                                      if (!result.success) {
                                                                          return {
                                                                                success: false,
                                                                                      error: result.error.issues[0]?.message ?? "Invalid input.",
                                                                                          };
                                                                                            }

                                                                                              const {
                                                                                                  name,
                                                                                                      email,
                                                                                                          password,
                                                                                                            } = result.data;

                                                                                                              const existingUser =
                                                                                                                  await prisma.user.findUnique({
                                                                                                                        where: {
                                                                                                                                email,
                                                                                                                                      },
                                                                                                                                          });

                                                                                                                                            if (existingUser) {
                                                                                                                                                return {
                                                                                                                                                      success: false,
                                                                                                                                                            error: "Email already exists.",
                                                                                                                                                                };
                                                                                                                                                                  }

                                                                                                                                                                    const hashedPassword =
                                                                                                                                                                        await bcrypt.hash(password, 12);

                                                                                                                                                                          const user = await prisma.user.create({
                                                                                                                                                                              data: {
                                                                                                                                                                                    name,
                                                                                                                                                                                          email,
                                                                                                                                                                                                password: hashedPassword,
                                                                                                                                                                                                      role: "CUSTOMER",
                                                                                                                                                                                                          },
                                                                                                                                                                                                            });

                                                                                                                                                                                                              await createSession(user.id);

                                                                                                                                                                                                                redirect("/dashboard");
                                                                                                                                                                                                                }

                                                                                                                                                                                                                const loginSchema = z.object({
                                                                                                                                                                                                                  email: z
                                                                                                                                                                                                                      .string()
                                                                                                                                                                                                                          .trim()
                                                                                                                                                                                                                              .email("Invalid email address."),

                                                                                                                                                                                                                                password: z
                                                                                                                                                                                                                                    .string()
                                                                                                                                                                                                                                        .min(1, "Password is required."),
                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                        export async function loginAction(
                                                                                                                                                                                                                                          formData: FormData
                                                                                                                                                                                                                                          ) {
                                                                                                                                                                                                                                            const result = loginSchema.safeParse({
                                                                                                                                                                                                                                                email: formData.get("email"),
                                                                                                                                                                                                                                                    password: formData.get("password"),
                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                        if (!result.success) {
                                                                                                                                                                                                                                                            return {
                                                                                                                                                                                                                                                                  success: false,
                                                                                                                                                                                                                                                                        error: result.error.issues[0]?.message ?? "Invalid input.",
                                                                                                                                                                                                                                                                            };
                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                const {
                                                                                                                                                                                                                                                                                    email,
                                                                                                                                                                                                                                                                                        password,
                                                                                                                                                                                                                                                                                          } = result.data;

                                                                                                                                                                                                                                                                                            const user =
                                                                                                                                                                                                                                                                                                await prisma.user.findUnique({
                                                                                                                                                                                                                                                                                                      where: {
                                                                                                                                                                                                                                                                                                              email,
                                                                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                          if (!user) {
                                                                                                                                                                                                                                                                                                                              return {
                                                                                                                                                                                                                                                                                                                                    success: false,
                                                                                                                                                                                                                                                                                                                                          error: "Invalid email or password.",
                                                                                                                                                                                                                                                                                                                                              };
                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                  const passwordMatches =
                                                                                                                                                                                                                                                                                                                                                      await bcrypt.compare(
                                                                                                                                                                                                                                                                                                                                                            password,
                                                                                                                                                                                                                                                                                                                                                                  user.password
                                                                                                                                                                                                                                                                                                                                                                      );

                                                                                                                                                                                                                                                                                                                                                                        if (!passwordMatches) {
                                                                                                                                                                                                                                                                                                                                                                            return {
                                                                                                                                                                                                                                                                                                                                                                                  success: false,
                                                                                                                                                                                                                                                                                                                                                                                        error: "Invalid email or password.",
                                                                                                                                                                                                                                                                                                                                                                                            };
                                                                                                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                                                                                                                await createSession(user.id);

                                                                                                                                                                                                                                                                                                                                                                                                  redirect("/dashboard");
                                                                                                                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                                                                                                                  export async function logoutAction() {
                                                                                                                                                                                                                                                                                                                                                                                                    await deleteSession();

                                                                                                                                                                                                                                                                                                                                                                                                      redirect("/login");
                                                                                                                                                                                                                                                                                                                                                                                                      }