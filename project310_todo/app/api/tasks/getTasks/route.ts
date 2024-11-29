import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

// Define the task type based on the provided details
type Task = {
  task_id: string;
  user_id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  priority_id: number;
  category_id: number;
  display_due_date: string;
};

const PST_TIMEZONE = "America/Los_Angeles"; // PST timezone

export async function GET() {
  const tasks = await supabase.from("tasks").select("*");

  // Type taskMap as Record of priority keys with arrays of Task
  const taskMap: Record<"UI" | "NUI" | "UNI" | "NUNI", Task[]> = {
    UI: [],
    NUI: [],
    UNI: [],
    NUNI: [],
  };

  const updated_tasks: Record<"UI" | "NUI" | "UNI" | "NUNI", Task[]>[] = [];

  if (tasks.data) {
    const now = new Date();
    const today = format(now, "yyyy-MM-dd");
    const tomorrow = format(
      new Date(now.getTime() + 24 * 60 * 60 * 1000),
      "yyyy-MM-dd"
    ); // Tomorrow date

    for (const task of tasks.data) {
      // Convert UTC to PST
      const utcDate = new Date(task.due_date);
      const pstDate = toZonedTime(utcDate, PST_TIMEZONE);
      const formattedDate = format(pstDate, "yyyy-MM-dd");

      // Set due date based on today, tomorrow, or the original due date
      if (formattedDate === today) {
        task.display_due_date = "Today";
      } else if (formattedDate === tomorrow) {
        task.display_due_date = "Tomorrow";
      } else {
        task.display_due_date = format(pstDate, "d MMM");
      }

      // Get priority and push the task to the corresponding array
      const priorityText = getPriorityTextByID(task.priority_id);
      taskMap[priorityText].push(task);

      // Push the taskMap to updated_tasks after processing
      updated_tasks.push({ ...taskMap }); // Create a shallow copy to push
    }

    return NextResponse.json({
      tasks: taskMap,
    });
  }

  return NextResponse.json({
    tasks: tasks.data,
  });
}

function getPriorityTextByID(
  priorityID: number
): "UI" | "NUI" | "UNI" | "NUNI" {
  switch (priorityID) {
    case 1:
      return "UI";
    case 2:
      return "NUI";
    case 3:
      return "UNI";
    case 4:
      return "NUNI";
    default:
      return "UI"; // Default value
  }
}
