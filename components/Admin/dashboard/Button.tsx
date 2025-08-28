import { getAllQuestionsById } from "@/lib/data";
import { Suspense } from "react";
import EvaluationPages from "./EvaluationPages";

export const UpdateQuestionsScores = async ({ id }: { id: string }) => {
  const questions = await getAllQuestionsById(id);

  if (!questions) return null;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EvaluationPages questions={questions} />
      </Suspense>
    </div>
  );
};
