import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Hello");
  const cookieStore = cookies(); // Await the cookies call
  const formData = await req.formData();
  console.log("FormData: ", formData);

  const email = String(formData.get("email"));

  const supabase = createRouteHandlerClient({
    cookies: () => Promise.resolve(cookieStore),
  });

  await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${process.env.APP_URL}/auth/callback`,
      shouldCreateUser: true,
    },
  });

  return NextResponse.redirect(`${process.env.APP_URL}/verifyEmail`, {
    status: 301,
  });
}
