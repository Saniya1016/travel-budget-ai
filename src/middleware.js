import { NextResponse } from "next/server";

// Helper function to check if origin is allowed
function isAllowedOrigin(origin) {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://travel-budget-ai-ci31.vercel.app',
    process.env.NEXT_PUBLIC_SITE_URL
  ].filter(Boolean); // Remove any undefined values

  return !origin || allowedOrigins.includes(origin);
}

export async function middleware(request) {
  const origin = request.headers.get('origin');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin(origin) ? origin : '',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  // For protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('authToken');

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const data = await res.json();
      const response = NextResponse.next();

      // Add CORS headers
      if (isAllowedOrigin(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Credentials', 'true');
      }
      
      response.headers.set('user-id', data.userId);
      return response;
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // For non-protected routes
  const response = NextResponse.next();
  if (isAllowedOrigin(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};