import { NextResponse } from "next/server";
import {db} from '@/lib/firebase-config';
import {collection} from 'firebase/firestore';

export async function GET(request){
    console.log(request);
    return NextResponse.json({});
}