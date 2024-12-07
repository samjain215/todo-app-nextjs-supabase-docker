import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

type User = {
  user_id: string;
  username: string;
  email: string;
  description: string;
  status: string;
};

export async function POST(req: NextRequest) {
  const user: User = await req.json();
  console.log(user);

  const { data, error } = await supabase
    .from("users")
    .upsert({ ...user }, { onConflict: "user_id" });

  console.log(data);

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Action Not Successfully",
      },
      { status: Number(error.code) }
    );
  }

  return NextResponse.json(
    {
      error: false,
      message: "User Saved Successfully",
    },
    { status: 200 }
  );
}
