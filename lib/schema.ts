import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

export const createUserSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .nonempty("Username is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
    role: z.string().nonempty("Role is required"),
    confPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .nonempty("Password is required"),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Passwords do not match",
    path: ["confPassword"],
  });

export const updateUserSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    username: z.string().nonempty("Username is required"),
    role: z.string().nonempty("Role is required"),
    password: z.string(),
    confPassword: z.string(),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Passwords do not match",
    path: ["confPassword"],
  });

export const categorySchema = z.object({
  name: z.string().nonempty("Name is required"),
});

export const questionsSchema = z.object({
  title: z.string(),
  soal: z.string(),
  sangat_memuaskan: z.number(),
  memuaskan: z.number(),
  cukup_memuaskan: z.number(),
  kurang_memuaskan: z.number(),
  categoryId: z.string().nonempty("Category is required"),
});
