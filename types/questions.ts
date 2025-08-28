import { Prisma } from "@/app/generated/prisma";

export type QuestionsProps = Prisma.PertanyaanGetPayload<{
  include: {
    category: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;
