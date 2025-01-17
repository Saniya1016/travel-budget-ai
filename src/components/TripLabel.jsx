"use client";

import { useTrip } from "@/lib/TripContext";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function TripLabel({trip, userId}) {

    const router = useRouter();
    const {setCurrentTrip} = useTrip();

    const handleViewTrip = async() => {
      const tripData = {...trip};
      setCurrentTrip(tripData);
      router.push('/dashboard/tripDetails');
    }

    const handleTripDelete = async() => {
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trips/${trip.id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId,
            })
        });

        if(!response.ok){
          console.log("Error deleteing trip");
        } 
        alert("Trip Deleted");
        router.push('/dashboard');

      } catch(error){
        console.error("Failed to delete trip: ", error);
      }
    }

  return (
    <div
      className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-700 cursor-pointer hover:shadow-lg hover:scale-105 transition transform duration-300"
    >
        <h3 className="text-xl font-semibold text-white mb-2">
        {trip.destination.name}
        </h3>
        <p className="text-gray-300">
        <span className="font-medium">Budget:</span> ${trip.budget}
        </p>
        <p className="text-gray-300">
        <span className="font-medium">Dates:</span> {trip.FromDate} -{" "}
        {trip.ToDate}
        </p>
        <div className="flex items-center justify-between gap-2 mt-4">
          <button onClick={handleViewTrip} className="px-3 py-1 bg-green-500 hover:bg-green-200 text-white text-xs rounded-lg">
            View Details
          </button>

          <button onClick={handleTripDelete} className="text-red-600 hover:bg-red-200"> 
            <RiDeleteBin6Line className="w-5 h-5" /> 
          </button>
        </div>

    </div>
  )
}
