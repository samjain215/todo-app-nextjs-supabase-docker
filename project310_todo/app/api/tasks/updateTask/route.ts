import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const taskData = await req.json();

  delete taskData.reqTaskData.display_due_date;
  console.log("Update Task Data =>", taskData.reqTaskData);

  const { data, error } = await supabase
    .from("tasks")
    .update({
      completed: taskData.reqTaskData.completed,
    })
    .eq("task_id", taskData.reqTaskData.task_id);

  if (data) console.log(data);
  if (error) {
    console.log(error);
    return NextResponse.json({
      error: true,
      message: error.message,
    });
  }

  return NextResponse.json({
    error: false,
    message: "Task Complete",
  });
}
