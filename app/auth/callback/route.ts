import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic"

const GET = async (req: Request) => {
    const reqURL = new URL(req.url)
    const code = reqURL.searchParams.get('code')

    if (code) {
        const supabase = createRouteHandlerClient({cookies})
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(reqURL.origin)

}

export default GET