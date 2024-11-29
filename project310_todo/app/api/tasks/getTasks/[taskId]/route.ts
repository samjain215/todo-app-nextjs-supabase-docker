import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { taskId: string } }
) {
  const { taskId } = context.params;

  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("task_id", taskId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ task });
}
