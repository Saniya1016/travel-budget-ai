import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-config";
import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { validateTripData } from "@/lib/validate-trip";

export async function PUT(req, context) {
    const params = await context.params;
    const { id } = params;
    const updateFields = await req.json();

    try {
        if (!id) {
            return NextResponse.json({ success: false, message: "ID not defined" }, { status: 400 });
        }

        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ success: false, message: "Update fields not defined" }, { status: 400 });
        }

        const tripRef = doc(db, "trips", id);
        const tripDoc = await getDoc(tripRef);

        if (!tripDoc.exists()) {
            return NextResponse.json({ success: false, message: "Trip not found" }, { status: 404 });
        }

        const tripData = tripDoc.data();
        const amountSpent = updateFields.spent ? tripData.spent + updateFields.spent : tripData.spent;
        
        const inputData = {
            FromDate: updateFields.FromDate || tripData.FromDate.toDate(),
            ToDate: updateFields.ToDate || tripData.ToDate.toDate(),
            destination: updateFields.destination || tripData.destination,
            recommendations: updateFields.recommendations || tripData.recommendations,
            spent: amountSpent,
            remainder: tripData.budget - amountSpent,
        };

        const { isValid, errors } = validateTripData(inputData, true);
        if (!isValid) {
            return NextResponse.json({ success: false, message: errors }, { status: 400 });
        }

        await updateDoc(tripRef, updateFields);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}



export async function DELETE(context) {
    const params = await context.params;
    const { id } = params;

    try {
        if (!id) {
            return NextResponse.json({ success: false, message: "ID not defined" }, { status: 400 });
        }

        const tripRef = doc(db, "trips", id);
        await deleteDoc(tripRef);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
