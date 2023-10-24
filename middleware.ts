import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const middleware = async(req: NextRequest) => {
    console.log("Middleware running...")
    const res = NextResponse.next();

    // create middlewareclient for supabase
    const supabase = createMiddlewareClient({req, res})

    // get user from supabase
    const { data: { user } } = await supabase.auth.getUser()

    // if user is not logged in redirect to landing page
    if(!user && req.nextUrl.pathname !== "/landing") {
        return NextResponse.redirect(new URL("/landing", req.url))
    }

    return res
}

export default middleware
export const config = {
    matcher: ['/((?!api|login|auth|_next/static|_next/image|favicon.ico).*)']
}