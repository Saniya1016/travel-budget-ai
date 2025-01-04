import { NextResponse } from "next/server";
import { validateTripData } from "@/lib/validate-trip";
import { adminDb } from "@/lib/firebase-admin";

export async function PUT(request, context){

    const params = await context.params; //get id from dynamic route
    const {id} = params;
    const updateFields = await request.json(); //get parameters from body

    try {

        if (!id) {
            return NextResponse.json({ success: false, message: "ID not defined" }, { status: 400 });
        }

        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ success: false, message: "Update fields not defined" }, { status: 400 });
        }

        const tripRef = adminDb.collection("trips").doc(id);
        const tripSnapshot = await tripRef.get();

        if (!tripSnapshot.exists) {
            return NextResponse.json({ success: false, message: "Trip not found" }, { status: 404 });
        }

        // Ensure the userId matches the trip owner (for security purposes)
        if (tripSnapshot.data().userId !== updateFields.userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
        }
        
        //amount spent needs to be added
        updateFields.spent = updateFields.expenses.reduce((accumulator, current) => accumulator + current.amount, 0);

        const {isValid, errors} = validateTripData(updateFields, true);

        if(!isValid){
            return NextResponse.json({ success: false, message: errors }, { status: 401 });
        }

        const allowedFields = ["expenses", "budget", "spent"];
        
        Object.keys(updateFields).forEach((key) => {
            if (!allowedFields.includes(key)) {delete updateFields[key]};
        });

        await tripRef.update(updateFields);
        return NextResponse.json({ success: true, message: "Trip updated successfully", trip: updatedTrip.data() }, { status: 200 });

    } catch(error){
        console.error("Error updating trip:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}



export async function DELETE(request, context){
    const params = await context.params;
    const {id} = params;

    try{

        if(!id){
            return NextResponse.json({ success: false, message: "ID not defined" }, { status: 400 });
        }

        const tripRef = adminDb.collection("trips").doc(id);
        const tripSnapshot = await tripRef.get();
    
        if (!tripSnapshot.exists) {
          return NextResponse.json({ success: false, message: "Trip not found" }, { status: 404 });
        }
    
        // Delete the trip document
        await tripRef.delete();
        return NextResponse.json({ success: true, message: "Trip deleted successfully" }, { status: 200 });

    }catch(error){
        console.error("Error deleting trip:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
