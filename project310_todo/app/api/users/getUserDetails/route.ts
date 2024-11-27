import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await req.json();

  console.log(user);

  try {
    const profileSnap = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user.userID);

    console.log(profileSnap.data);
    const profile = profileSnap.data ? profileSnap.data[0] : [];

    console.log(profile);

    if (profile) {
      return NextResponse.json({
        profile: {
          username: profile.username,
          status: profile.status,
          description: profile.description,
        },
      });
    } else {
      return NextResponse.json({
        profile: {
          username: "",
          status: "",
          description: "",
        },
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      profile: null,
      error: e,
    });
  }
}
