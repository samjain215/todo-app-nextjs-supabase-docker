import {
  createMiddlewareClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const cookieStore = cookies();

  if (code) {
    const cookieStore: any = await cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });

    const resp = await supabase.auth.exchangeCodeForSession(code);
    console.log("response: ", resp);
    const session = resp.data.session;
    supabase.auth.setSession({
      access_token: session!.access_token ?? "",
      refresh_token: session!.refresh_token ?? "",
    });
  }

  return NextResponse.redirect(`${url.origin}/home`);
}
