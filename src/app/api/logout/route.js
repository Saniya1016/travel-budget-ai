import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function POST(request) {
  
    try {

        const {idToken} = await request.json();
        // console.log('current user token in route', idToken);
        if(!idToken){
            return NextResponse.json({success: false, message: "No token provided"}, {status: 400});
        }
        
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const uid = decodedToken.uid;
        // console.log('UID extracted from token:', uid);

        // Revoke refresh tokens using the UID
        await adminAuth.revokeRefreshTokens(uid);
        const response = NextResponse.json({success: true}, {status: 200});
        response.cookies.set('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: -1
        });
        return response;

    } catch(error){
        return NextResponse.json({success: false, message: "Failed to Logout"}, {status: 500});
    }
}
