import { NextResponse } from "next/server";
import {db} from '@/lib/firebase-config';
import {collection, addDoc} from 'firebase/firestore';

export async function POST(request){
    try{
        // console.log(request.body);
        const { FromDate, ToDate, budget, destination, recommendations, spent, userId } = await request.json();
        const remainder = budget - spent;

        if (!destination || !userId) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const tripRef = await addDoc(collection(db, "trips"), {
            FromDate,
            ToDate,
            budget,
            destination,
            recommendations,
            spent,
            remainder,
            userId,
        });

        return NextResponse.json({success: true, tripId: tripRef.id}, {status: 200});

    } catch(error){
        return NextResponse.json({success: false, message: error.message}, {status: 500});
    }
}