interface User {
  name: string;
  username: string;
  password: string;
  role: string;
}

interface SignIn {
  username: string;
  password: string;
}

interface Category {
  name: string;
}

interface Questions {
  title: string;
  soal: string;
  sangat_memuaskan: number;
  memuaskan: number;
  cukup_memuaskan: number;
  kurang_memuaskan: number;
  categoryId: string;
}

interface QuestionsUpdated {
  sangat_memuaskan: number;
  memuaskan: number;
  cukup_memuaskan: number;
  kurang_memuaskan: number;
}
