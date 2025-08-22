// API route to verify user authentication via session cookie.
// - Retrieves 'sessionId' from request cookies.
// - Returns 401 if no session or session is invalid.
// - Returns 200 with user data if session is valid.


import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../../../lib/auth'; 

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('sessionId')?.value;
  if (!sessionId) return NextResponse.json({ authenticated: false }, { status: 401 });

  const { valid, user } = await AuthService.validateSession(sessionId);
  if (!valid) return NextResponse.json({ authenticated: false }, { status: 401 });

  return NextResponse.json({ authenticated: true, user }, { status: 200 });
}
