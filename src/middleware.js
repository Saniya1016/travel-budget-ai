import { NextResponse } from "next/server";

export async function middleware(request) {

    console.log("Middleware hit with request: ", request.url);

    const token = request.cookies.get('authToken');
  
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // console.log(token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}`,
          },
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const data = await res.json();

      const response = NextResponse.next();
      
      response.headers.set('user-id', data.userId);
  
      return response;

  }
  
export const config = {
    matcher: ['/dashboard/:path*'], // Protect routes under /dashboard
};