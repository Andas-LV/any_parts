import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // const token = request.cookies.get('token')?.value
    //
    // if (!token) {
    //     const loginUrl = new URL('/', request.url)
    //     loginUrl.searchParams.set('redirected', 'true')
    //     return NextResponse.redirect(loginUrl)
    // }
    //
    // return NextResponse.next()
}

export const config = {
    // matcher: [
    //     '/item/:path*',
    //     '/profile/:path*'
    // ]
}