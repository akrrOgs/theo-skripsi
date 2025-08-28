import EditQuestionsForm from "@/components/Admin/questions/EditQuestions";
import { getAllQuestionsById, getCategory } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const UpdateQuestions = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const questionId = (await params).id;
  const [categories, question] = await Promise.all([
    getCategory(),
    getAllQuestionsById(questionId),
  ]);

  if (!categories || !question) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <EditQuestionsForm categories={categories} questions={question} />
      </Suspense>
    </div>
  );
};

export default UpdateQuestions;
