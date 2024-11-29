import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const taskData = await req.json();

  console.log(taskData);

  return NextResponse.json({
    error: false,
    message: "Task Complete",
  });
}
