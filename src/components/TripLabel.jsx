

export default function TripLabel({trip}) {
  return (
    <div
        className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-700 hover:shadow-lg hover:scale-105 transition transform duration-300"
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
    </div>
  )
}
