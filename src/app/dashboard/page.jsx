import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getTrips(userId){

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trips`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'userId': `${userId}`,
      }
    },);

  const tripsData = await response.json();
  return tripsData.trips;

}



export default async function page() {

  //call to get all trips for user
  //could get user-id from header set by middleware

  const headersList = await headers();
  const userId = headersList.get('user-id');

  console.log(userId);

  if (!userId) {
    redirect('/login');
  }
  
  const trips = await getTrips(userId);
  


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-white">Welcome to Your Dashboard</h1>
      <h2 className="text-2xl font-medium text-gray-400 mt-4">Your Trips</h2>

      {/* Trips List */}
      {trips.length === 0 ? (
        <p className="text-lg text-gray-400 mt-6">
          No trips found. Start planning your next adventure!
        </p>
      ) : (
        <div className="mt-6 w-full max-w-4xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-700 hover:shadow-lg hover:scale-105 transition transform duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {trip.destination}
              </h3>
              <p className="text-gray-300">
                <span className="font-medium">Budget:</span> ${trip.budget}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Dates:</span> {trip.startDate} -{" "}
                {trip.endDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add New Trip Button */}
      <button className="mt-8 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-500 hover:scale-105 transition transform duration-300">
        + Add New Trip
      </button>
    </div>
  );
}
