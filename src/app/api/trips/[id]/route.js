import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";


export async function PUT(request){

    const { id } = request.query;


}

export async function DELETE(request){

}