"use client";

import { useTrip } from "@/lib/TripContext";

export default function TripPage() {

    const { currentTrip } = useTrip();

    if (!currentTrip) return (<div>No trip selected</div>);

    return (
        <div>
            <h1>Trip Details</h1>
            <p>
                <span className="font-medium">Destination:</span>{" "}
                {currentTrip.destination.name}
            </p>
            <p>
                <span className="font-medium">Budget:</span> ${currentTrip.budget}
            </p>
            
        </div>
    );
}
