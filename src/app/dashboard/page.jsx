import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateTripButton from "@/components/CreateTripButton";
import TripLabel from "@/components/TripLabel";
import { api } from "@/lib/services/api";


async function getTrips(userId){
  try {

    const tripsData = await api.getAllTrips(userId);

    const trips = tripsData.trips.map((trip) => ({
      ...trip,
      FromDate: new Date(trip.FromDate).toLocaleDateString(),
      ToDate: new Date(trip.ToDate).toLocaleDateString(),
    }));

    return trips;

  } catch (error) {
    console.error("Error in getAllTrips:", error);
    throw error;
  }
}

export default async function page() {

  //call to get all trips for user
  //could get user-id from header set by middleware

  const headersList = await headers();
  const userId = headersList.get('user-id');

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
            <TripLabel key={trip.id} trip={trip} userId={userId}/>
          ))}
        </div>
      )}

      {/* Add New Trip Button */}
      <CreateTripButton />
    </div>
  );
}
