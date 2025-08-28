"use client";

import { questionsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { Category } from "@/app/generated/prisma";
import { Textarea } from "@/components/ui/textarea";
import { createQuestions } from "@/lib/actions";
import { Input } from "@/components/ui/input";

const CreateQuestionsForm = ({ categories }: { categories: Category[] }) => {
  const form = useForm<z.infer<typeof questionsSchema>>({
    resolver: zodResolver(questionsSchema),
    defaultValues: {
      title: "",
      soal: "",
      sangat_memuaskan: 0,
      memuaskan: 0,
      cukup_memuaskan: 0,
      kurang_memuaskan: 0,
      categoryId: "",
    },
  });

  function onSubmit(values: Questions) {
    createQuestions(values);
  }
  return (
    <div className="flex flex-col w-full bg-white rounded-[12px] border border-slate-200 min-h-auto">
      <Link
        href="/admin/questions"
        className="p-6 flex gap-2 items-center text-base font-medium text-slate-800 border-b border-slate-200"
      >
        <ArrowLeft className="size-5" />
        Questions Table
      </Link>
      <div className="flex flex-col gap-6 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10"
                      placeholder="Pertanyaan 1 / Questions 1."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Soal Field */}
            <FormField
              control={form.control}
              name="soal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Questions</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-10"
                      placeholder="Type your questions here."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category Field */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-900">
                    Category
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem value={category.id} key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm font-normal text-slate-500">
                    The existing category list can be seen in the{" "}
                    <Link
                      href="/admin/categories"
                      className="underline underline-offset-2 text-blue-600"
                    >
                      category
                    </Link>{" "}
                    menu
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full p-3 bg-blue-600 cursor-pointer mt-5 text-base font-semibold"
            >
              Create Questions
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateQuestionsForm;
