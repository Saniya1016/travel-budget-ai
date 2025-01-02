import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { validateTripData } from "@/lib/validate-trip";

export async function POST(request) {

    try{
        const tripData = await request.json();
        const {FromDate, ToDate, budget, destination, userId} = tripData;
        const expenses = [];
        const recommendations = [];
        const spent = 0;

        const {isValid, errors} = validateTripData({ FromDate, ToDate, budget, destination, spent, userId }, false);

        if(!isValid){
            return NextResponse.json({ success: false, message: errors }, { status: 401 });
        }

        //create trip document in firestore
        const tripRef = await adminDb.collection("trips").add({
            spent,
            expenses,
            recommendations,
            ...tripData,
        });

        return NextResponse.json({ success: true, tripId: tripRef.id }, { status: 201 });

    } catch(error){
        console.error("Error creating trips");
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    
}