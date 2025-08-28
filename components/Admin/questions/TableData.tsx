import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { ButtonDelete, ButtonEdit } from "./Button";
import { QuestionsProps } from "@/types/questions";

const TableData = ({ data }: { data: QuestionsProps[] }) => {
  if (!data) return null;

  return (
    <Table>
      <TableHeader className="bg-gray-100 py-10 px-4 text-center">
        <TableRow>
          <TableHead className="py-3 text-center">No.</TableHead>
          <TableHead className="py-3 text-center">Questions</TableHead>
          <TableHead className="py-3 text-center">Category</TableHead>
          <TableHead className="py-3 text-center">Created At</TableHead>
          <TableHead className="py-3 text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((quest, index) => (
          <TableRow key={quest.id} className="bg-white">
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {index + 1}
            </TableCell>
            <TableCell className="py-3 px-4 w-96 text-sm font-normal text-slate-600 whitespace-normal overflow-wrap break-word overflow-y-auto">
              {quest.soal}
            </TableCell>
            <TableCell className="py-3 px-4 w-90 text-center text-sm font-normal text-slate-600 whitespace-normal overflow-wrap break-word overflow-y-auto">
              {quest.category.name}
            </TableCell>
            <TableCell className="py-3 px-4 text-center text-sm font-normal text-slate-600">
              {formatDate(quest.createdAt)}
            </TableCell>
            <TableCell className="py-3 px-4 text-center text-sm font-normal flex items-center gap-2 justify-center">
              <ButtonEdit id={quest.id} />
              <ButtonDelete id={quest.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableData;
