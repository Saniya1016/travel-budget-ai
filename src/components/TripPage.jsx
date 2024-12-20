"use client";

import { useTrip } from "@/lib/TripContext";

export default function TripPage() {

   const tripData = useTrip();


  return (
    <div>
      <h1>Trip Details</h1>
    </div>
  );
}
