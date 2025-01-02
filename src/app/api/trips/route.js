import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";  // Make sure you have this setup

export async function GET(request){
    try{
        const userId = request.headers.get('userId');
        // console.log("API received userId:", userId);
        
        const tripsSnapshot = await adminDb
            .collection('trips')
            .where('userId', '==', userId)
            .get();

        const trips = [];
        tripsSnapshot.forEach((doc) => {
            trips.push({ id: doc.id, ...doc.data() });
        });

        return NextResponse.json({success: true, trips}, {status: 200});

    } catch(error){
        console.error("API Error:", error);
        return NextResponse.json({success: false, message: error.message}, {status: 500});
    }
}