import { NextResponse } from 'next/server';

//called by login page 
//sets the token

export async function POST(request) {
  try {
    const { idToken } = await request.json();
    console.log(idToken);

    // Set HttpOnly, secure cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('authToken', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 3600 // 1 hour
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}