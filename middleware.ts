import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = ['/admin', '/admin/dashboard', '/admin/projects', '/admin/services', '/admin/skills', '/admin/testimonials', '/admin/messages', '/admin/settings', '/admin/media']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/login' || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  if (protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    const authCookie = req.cookies.get('admin_session')
    if (!authCookie || authCookie.value !== 'admin-authenticated') {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
