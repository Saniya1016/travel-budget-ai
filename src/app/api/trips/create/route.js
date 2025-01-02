import { NextResponse } from "next/server";
import {db} from '@/lib/firebase-config';
import {collection, addDoc} from 'firebase/firestore';
import { validateTripData } from "@/lib/validate-trip";

export async function POST(request){
    
    try{

        const tripData = await request.json();
        const { FromDate, ToDate, budget, destination, recommendations, spent, userId } = tripData;
        const remainder = budget - spent;
        const expenses = [];

        const {isValid, errors} = validateTripData({ FromDate, ToDate, budget, destination, recommendations, remainder, userId }, false);

        if(!isValid){
            return NextResponse.json({ success: false, message: errors }, { status: 400 });
        }

        const tripRef = await addDoc(collection(db, "trips"), {
            FromDate,
            ToDate,
            budget,
            destination,
            recommendations,
            spent,
            remainder,
            expenses,
            userId,
        });

        return NextResponse.json({success: true, tripId: tripRef.id}, {status: 200});

    } catch(error){
        return NextResponse.json({success: false, message: error.message}, {status: 500});
    }
}