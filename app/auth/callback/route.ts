import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// todo: on callback write info to user database
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (code) {
        const cookieStore = cookies()
        const supabase = createRouteHandlerClient({cookies: () => cookieStore})
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    return NextResponse.redirect(new URL("/login", req.url))
}