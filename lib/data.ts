import { prisma } from "./prisma";

const ITEMS_PER_PAGE = 5;

// USERS DATA
export const getUsers = async () => {
  try {
    const result = await prisma.user.findMany();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersBySearch = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const result = await prisma.user.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            role: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getUsersPages = async (query: string) => {
  try {
    const result = await prisma.user.count({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    const totalPages = Math.ceil(Number(result) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersById = async (usersId: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id: usersId },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// QUESTIONS DATA
export const getQuestions = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const result = await prisma.pertanyaan.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        OR: [
          {
            soal: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionsBySearch = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const result = await prisma.pertanyaan.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        soal: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionsPages = async (query: string) => {
  try {
    const result = await prisma.pertanyaan.count({
      where: {
        soal: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    const totalPages = Math.ceil(Number(result) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
};

export const getAllQuestionsById = async (questId: string) => {
  try {
    const result = await prisma.pertanyaan.findUnique({
      where: { id: questId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllQuestions = async () => {
  try {
    const result = await prisma.pertanyaan.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// CATEGORY DATA
export const getCategory = async () => {
  try {
    const result = await prisma.category.findMany();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getCategoriesBySearch = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const result = await prisma.category.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesPages = async (query: string) => {
  try {
    const result = await prisma.category.count({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    const totalPages = Math.ceil(Number(result) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategoryById = async (categoryId: string) => {
  try {
    const result = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
