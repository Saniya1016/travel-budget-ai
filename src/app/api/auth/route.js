import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

//called by middleware
//verify token with firebase

export async function POST(request){
    try{

        const token = request.headers.get('Authorization')?.split(' ')[1];
        
        if(!token){
            throw new Error('No token provided');
        }

        const decodedToken = await adminAuth.verifyIdToken(token);
        console.log('Decoded token:', decodedToken);
        return NextResponse.json({ success: true }, { status: 200 });


    } catch(error){
        console.error('Error in auth route:', error.message);
        return NextResponse.json({ success: false }, { status: 400 });
    }
}