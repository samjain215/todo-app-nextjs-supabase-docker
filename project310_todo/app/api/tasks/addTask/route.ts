import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const taskData = (await req.json())["data"];

  console.log("Data => ", taskData);

  try {
    delete taskData.task_id;
    delete taskData.display_due_date;

    const { data, error } = await supabase
      .from("tasks")
      .insert({ ...taskData });

    if (data) console.log(data);
    if (error) {
      return NextResponse.json({
        error: true,
        message: error.message,
      });
    }
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: e,
    });
  }
  return NextResponse.json({
    error: false,
    message: "Task Added Successfully",
  });
}
