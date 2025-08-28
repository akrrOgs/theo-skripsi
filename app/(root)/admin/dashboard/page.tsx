import { auth } from "@/auth";
import DashboardPJ from "@/components/Admin/dashboard/DashboardPJ";
import TableData from "@/components/Admin/dashboard/TableData";
import { getAllQuestions, getCategory, getUsers } from "@/lib/data";

const Dashboard = async () => {
  const session = await auth();
  const questions = await getAllQuestions();
  const users = await getUsers();
  const categories = await getCategory();

  return (
    <div>
      {session?.user?.role === "Penajaminan Mutu" ? (
        <DashboardPJ
          questions={questions || []}
          users={users || []}
          categories={categories || []}
        />
      ) : (
        <TableData data={questions || []} />
      )}
    </div>
  );
};

export default Dashboard;
