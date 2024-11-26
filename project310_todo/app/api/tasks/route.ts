import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function GET() {
  const tasks = await supabase.from("tasks").select("*");

  const updated_tasks = [];
  if (tasks.data) {
    for (const task of tasks.data) {
      const formattedDate = format(new Date(task.due_date), "d MMM");
      task["due_date"] = formattedDate;
      const map = { ...task, completed: false };
      updated_tasks.push(map);
    }

    return NextResponse.json({
      tasks: updated_tasks,
    });
  }

  return NextResponse.json({
    tasks: tasks.data,
  });
}
