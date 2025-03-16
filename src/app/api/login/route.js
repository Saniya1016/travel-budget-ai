import { NextResponse } from 'next/server';

//called by login page 
//sets the token

export async function POST(request) {
  try {
    const { idToken } = await request.json();
    // console.log("In api/login token: ", idToken);
    // console.log('NODE_ENV:', process.env.NODE_ENV);


    // Set HttpOnly, secure cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('authToken', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', //strict or none or lax
      path: '/',
      maxAge: 3600 // 1 hour
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}