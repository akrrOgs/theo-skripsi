"use server";

import { hashSync } from "bcrypt-ts";
import { createUserSchema, signInSchema } from "./schema";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const signInCredentials = async (formData: SignIn) => {
  const validatedFields = signInSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/admin/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid username or password",
          };
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

export const createUserCredentials = async (formData: User) => {
  const validatedFields = createUserSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, username, role, password } = validatedFields.data;

  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        username,
        role,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return {
      message: "Failed to create user",
      error,
    };
  }
  redirect("/signin");
};
