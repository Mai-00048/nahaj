// API route handling user authentication:
// POST - Logs in a user:
//   - Expects 'email' and 'password' in request body.
//   - Validates credentials via AuthService.
//   - Sets 'sessionId' cookie if login succeeds.
//   - Returns 400 if missing data, 401 if invalid credentials, 500 on server error.
// DELETE - Logs out a user:
//   - Reads 'sessionId' from cookies and invalidates the session.
//   - Clears the 'sessionId' cookie.
//   - Returns 500 on server error.


import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'password is required' },
        { status: 400 }
      );
    }

    const { user, session, error } = await AuthService.login(email, password);

    if (error || !user || !session) {
      return NextResponse.json(
        { error: error || 'Invalid credentials' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
      },
      sessionId: session.id
    });

    response.cookies.set('sessionId', session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('sessionId')?.value;

    if (sessionId) {
      await AuthService.logout(sessionId);
    }

    const response = NextResponse.json({ message: 'Logout successful' });
    response.cookies.set('sessionId', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}