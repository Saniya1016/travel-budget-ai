import { NextResponse } from "next/server";
import {db} from '@/lib/firebase-config';
import {collection, query, where, getDocs} from 'firebase/firestore';

export async function GET(request){

    try{
        
        const userId = request.headers.get('userId');
        
        const q = query(collection(db, 'trips'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push({id: doc.id, ...doc.data()});
        });
        return NextResponse.json({success: true, trips}, {status: 200});

    } catch(error){
        return NextResponse.json({success: false, message: error.message}, {status: 500});
    }

}