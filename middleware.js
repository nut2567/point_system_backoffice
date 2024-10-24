import { NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware";
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    // return NextResponse.redirect('/')
 
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}