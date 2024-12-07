export type Task = {
  task_id: number;
  user_id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  priority_id: number;
  category_id: number;
  display_due_date: string;
};

export type Category = {
  category_id: number;
  name: string;
};
