import TableData from "@/components/Admin/questions/TableData";
import Pagination from "@/components/Pagination";
import SearchData from "@/components/Search";
import {
  getAllQuestions,
  getCategory,
  getQuestions,
  getQuestionsBySearch,
  getQuestionsPages,
} from "@/lib/data";
import { Plus } from "lucide-react";
import Link from "next/link";

const Users = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const { query = "", page = "1" } = (await searchParams) ?? {};
  const currentPage = Number(page);
  const questions = await getQuestions(query, currentPage);
  const allQuestions = await getAllQuestions();
  const categories = await getCategory();

  const totalPages = await getQuestionsPages(query);

  return (
    <div className="w-full bg-white rounded-[12px]">
      <h1 className="p-6 text-base font-medium text-gray-900 border-b border-slate-200">
        Total Pertanyaan : {allQuestions?.length}
      </h1>
      <div className="flex justify-between items-center p-6">
        <SearchData
          data={categories || []}
          placeholder="Search by Questions"
          showSelected={true}
          selectValue="Category"
        />
        <Link
          href="/admin/questions/create"
          className="flex text-slate-50 rounded-md bg-blue-600 items-center py-2 px-3 gap-1.5"
        >
          <Plus className="size-5 text-white" />
          <p className="text-sm font-medium">Add Questions</p>
        </Link>
      </div>
      <TableData data={questions || []} />
      <div className="flex justify-center items-center py-6 px-4 border-t border-slate-200">
        <Pagination totalPages={totalPages || 1} />
      </div>
    </div>
  );
};

export default Users;
