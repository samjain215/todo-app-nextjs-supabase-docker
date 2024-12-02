export type Task = {
  task_id: string; // Generate unique id
  user_id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  priority_id: number;
  category_id: number;
  display_due_date: string;
};
