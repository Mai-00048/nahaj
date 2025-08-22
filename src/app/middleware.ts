import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthService } from './lib/auth';

export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get('sessionId')?.value;
  
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!sessionId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { valid } = await AuthService.validateSession(sessionId);
    
    if (!valid) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('sessionId', '', { maxAge: 0 });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};