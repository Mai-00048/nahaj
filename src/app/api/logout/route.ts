import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json({ error: 'SessionId missing' }, { status: 400 });
  }

  console.log('Logging out session:', sessionId);

  return NextResponse.json({ message: 'Logged out successfully' });
}
