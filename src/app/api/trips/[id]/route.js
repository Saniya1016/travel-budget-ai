import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export async function PUT(req, context) {
    const params = await context.params;
    const { id } = params;
    const updateFields = await req.json();

    try{

        if(!id){
            return NextResponse.json({success: false, message: "id not defined"}, {status: 400});
        }

        if(Object.keys(updateFields).length === 0){
            return NextResponse.json({success: false, message: "update fields not defined"}, {status: 400});
        }

        const tripRef = doc(db, 'trips', id);
        await updateDoc(tripRef, updateFields);

        return NextResponse.json({success: true}, {status: 200});

    } catch(error){
        console.error(error);
        return NextResponse.json({success: false, message: error.message}, {status: 500});
    }
    
}

export async function DELETE(req, context){
    const params = await context.params;
    const { id } = params;
    // console.log('ID:', id);

    try{

        if(!id){
            return NextResponse.json({success: false, message: "id not defined"}, {status: 400});
        }

        const tripRef = doc(db, 'trips', id);
        await deleteDoc(tripRef);

        return NextResponse.json({success: true}, {status: 200});

    } catch(error){
        console.error(error);
        return NextResponse.json({success: false, message: error.message}, {status: 500});
    }
}