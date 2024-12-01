import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

type Category = {
  category_id: string;
  name: string;
};

export async function GET() {
  const { data, error } = await supabase.from("categories").select("*");

  if (data) {
    const categories: Category[] = [];
    for (const cat of data) {
      const map: Category = {
        category_id: cat.category_id,
        name: cat.name,
      };
      categories.push(map);
    }
    return NextResponse.json({
      error: false,
      message: "Categories Found",
      data: {
        category: categories,
      },
    });
  } else if (error) {
    console.log("Error Fetching Categories => ", error);
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
