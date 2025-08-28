"use server";

import { hashSync } from "bcrypt-ts";
import {
  categorySchema,
  createUserSchema,
  questionsSchema,
  signInSchema,
  updateUserSchema,
} from "./schema";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { Pertanyaan } from "@/app/generated/prisma";

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

// USERS ACTIONS
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
  redirect("/admin/users");
};

export const editUsers = async (formData: User, userId: string) => {
  const validatedFields = updateUserSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, username, role, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  let hashedPassword;
  if (password) {
    hashedPassword = hashSync(password, 10);
  } else {
    hashedPassword = existingUser?.password;
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        username,
        role,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
};

export const deleteUsers = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/users");
};

// CATEGORY ACTIONS
export const createCategories = async (formData: Category) => {
  const validatedFields = categorySchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  try {
    await prisma.category.create({
      data: {
        name,
      },
    });
  } catch (error) {
    return {
      message: "Failed to create category",
      error,
    };
  }
  redirect("/admin/categories");
};

export const updateCategories = async (
  formData: Category,
  categoryId: string
) => {
  const validatedFields = categorySchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  try {
    await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
      },
    });
  } catch (error) {
    return {
      message: "Failed to update category",
      error,
    };
  }
  redirect("/admin/categories");
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await prisma.category.delete({
      where: { id: categoryId },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/categories");
};

// QUESTIONS ACTIONS
export const createQuestions = async (formData: Questions) => {
  const validatedFields = questionsSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    title,
    soal,
    sangat_memuaskan,
    memuaskan,
    cukup_memuaskan,
    kurang_memuaskan,
    categoryId,
  } = validatedFields.data;

  try {
    await prisma.pertanyaan.create({
      data: {
        title,
        soal,
        sangat_memuaskan,
        memuaskan,
        cukup_memuaskan,
        kurang_memuaskan,
        categoryId,
      },
    });
  } catch (error) {
    return {
      message: "Failed to create questions",
      error,
    };
  }
  redirect("/admin/questions");
};

export const updateQuestions = async (
  formData: Questions,
  questionsId: string
) => {
  const validatedFields = questionsSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    title,
    soal,
    sangat_memuaskan,
    memuaskan,
    cukup_memuaskan,
    kurang_memuaskan,
    categoryId,
  } = validatedFields.data;

  try {
    const existingQuestion = await prisma.pertanyaan.findUnique({
      where: { id: questionsId },
    });

    if (existingQuestion) {
      const updatedData = {
        title,
        soal,
        sangat_memuaskan: existingQuestion.sangat_memuaskan + sangat_memuaskan,
        memuaskan: existingQuestion.memuaskan + memuaskan,
        cukup_memuaskan: existingQuestion.cukup_memuaskan + cukup_memuaskan,
        kurang_memuaskan: existingQuestion.kurang_memuaskan + kurang_memuaskan,
        categoryId,
      };

      await prisma.pertanyaan.update({
        where: { id: questionsId },
        data: updatedData,
      });
    } else {
      await prisma.pertanyaan.update({
        where: { id: questionsId },
        data: {
          title,
          soal,
          sangat_memuaskan,
          memuaskan,
          cukup_memuaskan,
          kurang_memuaskan,
          categoryId,
        },
      });
    }
  } catch (error) {
    return {
      message: "Failed to update questions",
      error,
    };
  }
  redirect("/admin/questions");
};

export const deleteQuestions = async (questionsId: string) => {
  try {
    await prisma.pertanyaan.delete({
      where: { id: questionsId },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/questions");
};

// export const updateQuestionsScore = async (
//   formData: QuestionsUpdated,
//   questionsId: string
// ) => {
//   const validatedFields = questionsSchema.safeParse(formData);

//   if (!validatedFields.success) {
//     return {
//       error: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const { soal,sangat_memuaskan, memuaskan, cukup_memuaskan, kurang_memuaskan } =
//     validatedFields.data;

//   try {
//     await prisma.pertanyaan.update({
//       where: { id: questionsId },
//       data: {
//         sangat_memuaskan,
//         memuaskan,
//         cukup_memuaskan,
//         kurang_memuaskan,
//       },
//     });
//   } catch (error) {
//     return {
//       message: "Failed to update questions",
//       error,
//     };
//   }
//   redirect("/admin/questions");
// };
