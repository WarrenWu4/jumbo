import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    console.log("Authenticating with Google...")
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${new URL("/auth/callback", req.url)}`
        }
    })

    if (data.url) {
        return NextResponse.redirect(data.url, {status: 301})
    } else {
        console.log("Auth Error: ", error)
    }
}