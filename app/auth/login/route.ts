import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Hello");
  const url = new URL(req.url);
  const cookieStore = await cookies(); // Await the cookies call
  const formData = await req.formData();
  console.log("FormData: ", formData);

  const email = String(formData.get("email"));

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const response = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${url.origin}/auth/callback`,
      shouldCreateUser: true,
    },
  });

  return NextResponse.redirect(url.origin, {
    status: 301,
  });
}
