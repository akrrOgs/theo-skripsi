import CreateQuestionsForm from "@/components/Admin/questions/CreateQuestionsForm";
import { getCategory } from "@/lib/data";

const CreateQuestions = async () => {
  const categories = await getCategory();

  if (!categories) return null;

  return (
    <div className="max-w-screen-xl mx-auto">
      <CreateQuestionsForm categories={categories} />
    </div>
  );
};

export default CreateQuestions;
