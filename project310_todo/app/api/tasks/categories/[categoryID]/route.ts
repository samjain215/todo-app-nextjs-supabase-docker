import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { categoryID: string } }
) {
  const categoryID = (await context.params)["categoryID"];

  console.log("Category ID => ", typeof categoryID);

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("category_id", Number(categoryID));

  if (data) {
    const categoryTasks = data;
    return NextResponse.json({
      error: false,
      message: "Categories Found",
      data: {
        categories: categoryTasks,
      },
    });
  } else if (error) {
    return NextResponse.json({
      error: true,
      message: error.message,
      data: null,
    });
  } else {
    return NextResponse.json({
      error: true,
      message: "Categories Not Found",
      data: null,
    });
  }
}
