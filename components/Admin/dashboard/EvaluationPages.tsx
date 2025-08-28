"use client";

import { Pertanyaan } from "@/app/generated/prisma";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { updateQuestions } from "@/lib/actions";
import { Pencil } from "lucide-react";
import { useState } from "react";

const EvaluationPages = ({ questions }: { questions: Pertanyaan }) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const soal = questions.soal;
  const categoryId = questions.categoryId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Inisialisasi nilai dengan 0
    const values = {
      soal,
      sangat_memuaskan: 0,
      memuaskan: 0,
      cukup_memuaskan: 0,
      kurang_memuaskan: 0,
      categoryId,
    };

    // Tambahkan nilai sesuai dengan checkbox yang dicentang
    if (selectedOption === 20) {
      values.sangat_memuaskan = 20;
    }
    if (selectedOption === 15) {
      values.cukup_memuaskan = 15;
    }
    if (selectedOption === 10) {
      values.memuaskan = 10;
    }
    if (selectedOption === 5) {
      values.kurang_memuaskan = 5;
    }

    try {
      await updateQuestions(values, questions.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (value: number) => {
    setSelectedOption(selectedOption === value ? null : value);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Pencil className="size-5 hover:text-yellow-500 hover:scale-125 transition-all duration-200" />
        </PopoverTrigger>
        <PopoverContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center pr-5">
              <label htmlFor="">Sangat Memuaskan</label>
              <input
                className="w-7 h-7 border-2 border-black rounded-2xl"
                type="checkbox"
                checked={selectedOption === 20}
                onChange={() => handleCheckboxChange(20)}
              />
            </div>
            <div className="flex justify-between items-center pr-5">
              <label htmlFor="">Cukup Memuaskan</label>
              <input
                className="w-7 h-7 border-2 border-black rounded-2xl"
                type="checkbox"
                checked={selectedOption === 15}
                onChange={() => handleCheckboxChange(15)}
              />
            </div>
            <div className="flex justify-between items-center pr-5">
              <label htmlFor="">Memuaskan</label>
              <input
                className="w-7 h-7 border-2 border-black rounded-2xl"
                type="checkbox"
                checked={selectedOption === 10}
                onChange={() => handleCheckboxChange(10)}
              />
            </div>
            <div className="flex justify-between items-center pr-5">
              <label htmlFor="">Kurang Memuaskan</label>
              <input
                className="w-7 h-7 border-2 border-black rounded-2xl"
                type="checkbox"
                checked={selectedOption === 5}
                onChange={() => handleCheckboxChange(5)}
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="p-2 w-full rounded-md text-white hover:bg-blue-800 bg-blue-900"
              >
                Submit
              </button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EvaluationPages;
