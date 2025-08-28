"use client";

import { Category, User } from "@/app/generated/prisma";
import { QuestionsProps } from "@/types/questions";
import { Chart, registerables } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Widget from "./Widget";
Chart.register(...registerables);

const DashboardPJ = ({
  questions,
  users,
  categories,
}: {
  questions: QuestionsProps[];
  users: User[];
  categories: Category[];
}) => {
  return (
    <div className="bg-white rounded-lg p-2 grid gap-4">
      <div className="grid grid-cols-3 gap-2 w-full">
        <Widget
          value={questions?.length || 0}
          titleCard="Questions"
          bgColor="bg-blue-900"
          link="/admin/questions"
        />
        <Widget
          value={users?.length || 0}
          titleCard="Users"
          bgColor="bg-blue-700"
          link="/admin/users"
        />
        <Widget
          value={categories?.length || 0}
          titleCard="Categories"
          bgColor="bg-blue-500"
          link="/admin/categories"
        />
      </div>
      {/* Bar Data */}
      <div className="w-full h-[400px] flex justify-center items-center">
        <Bar
          data={{
            xLabels: questions.map((data) => data.title),
            labels: questions.map((data) => data.title),
            datasets: [
              {
                label: "Sangat Memuaskan",
                data: questions.map((data) => data.sangat_memuaskan),
                borderRadius: 5,
                borderWidth: 1,
                // borderSkipped: false,
              },
              {
                label: "Memuaskan",
                data: questions.map((data) => data.memuaskan),
                borderRadius: 5,
                borderWidth: 1,
              },
              {
                label: "Cukup Memuaskan",
                data: questions.map((data) => data.cukup_memuaskan),
                borderRadius: 5,
                borderWidth: 1,
              },
              {
                label: "Kurang Memuaskan",
                data: questions.map((data) => data.kurang_memuaskan),
                borderRadius: 5,
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default DashboardPJ;
