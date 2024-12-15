"use client";

export default function TripLabel({trip}) {

    const handleViewTrip = async() => {
      console.log("view trip");
    }

  return (
    <div
      className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-700 cursor-pointer hover:shadow-lg hover:scale-105 transition transform duration-300"
      
    >
        <h3 className="text-xl font-semibold text-white mb-2">
        {trip.destination}
        </h3>
        <p className="text-gray-300">
        <span className="font-medium">Budget:</span> ${trip.budget}
        </p>
        <p className="text-gray-300">
        <span className="font-medium">Dates:</span> {trip.FromDate} -{" "}
        {trip.ToDate}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span onClick={handleViewTrip} className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg">
            View Details
          </span>
        </div>

    </div>
  )
}
