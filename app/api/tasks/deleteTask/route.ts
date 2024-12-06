import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const taskID = (await req.json())["taskID"];

  const delResponse = await supabase
    .from("tasks")
    .delete()
    .eq("task_id", taskID);

  if (delResponse.status === 204) {
    return NextResponse.json({
      error: false,
      message: `TaskID : ${taskID} is deleted successfully`,
    });
  }
  if (delResponse.error) {
    return NextResponse.json({
      error: true,
      message: delResponse.error.message,
    });
  }

  return NextResponse.json({
    error: true,
    message: `Server Error`,
  });
}
