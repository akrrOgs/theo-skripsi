import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateQuestionsScores } from "./Button";
import { QuestionsProps } from "@/types/questions";

const TableData = ({ data }: { data: QuestionsProps[] }) => {
  if (!data) return null;

  return (
    <Table>
      <TableHeader className="bg-gray-100 py-10 px-4 text-center">
        <TableRow>
          <TableHead className="py-3 text-center">No.</TableHead>
          <TableHead className="py-3">Pernyataan</TableHead>
          <TableHead className="py-3">Kategori</TableHead>
          <TableHead className="py-3 text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((question, index) => (
          <TableRow key={question.id} className="bg-white">
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {index + 1}
            </TableCell>
            <TableCell className="py-3 px-4 text-sm font-normal text-slate-600 whitespace-normal overflow-wrap break-word overflow-y-auto w-96">
              {question.soal}
            </TableCell>
            <TableCell className="py-3 px-4 text-sm font-normal text-slate-600 whitespace-normal overflow-wrap break-word overflow-y-auto w-96">
              {question.category.name}
            </TableCell>

            <TableCell className="py-3 px-4 text-center text-sm font-normal flex items-center gap-2 justify-center">
              <UpdateQuestionsScores id={question.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableData;
