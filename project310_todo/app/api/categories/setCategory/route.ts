import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const categoryData = await req.json();
  console.log("categoryData => ", categoryData);

  const { data, error } = await supabase
    .from("categories")
    .insert({ ...categoryData });

  console.log("Data => ", data);
  if (error) {
    return NextResponse.json({
      error: true,
      message: error.message,
      data: null,
    });
  }

  return NextResponse.json({
    error: false,
    message: "Inserted Category Successfully",
  });
}
