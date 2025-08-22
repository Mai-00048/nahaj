import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../../../lib/auth'; // المسار صحيح من داخل /app/api/auth/me/route.ts

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('sessionId')?.value;
  if (!sessionId) return NextResponse.json({ authenticated: false }, { status: 401 });

  const { valid, user } = await AuthService.validateSession(sessionId);
  if (!valid) return NextResponse.json({ authenticated: false }, { status: 401 });

  return NextResponse.json({ authenticated: true, user }, { status: 200 });
}
