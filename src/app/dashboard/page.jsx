import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateTripButton from "@/components/CreateTripButton";
import TripLabel from "@/components/TripLabel";

async function getTrips(userId){

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trips`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'userId': `${userId}`,
      }
    },);

  const tripsData = await response.json();

  const trips = tripsData.trips.map((trip) => ({
    ...trip,
    FromDate: new Date(trip.FromDate).toLocaleDateString(),
    ToDate: new Date(trip.ToDate).toLocaleDateString(),
  }));

  return trips;

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
            <TripLabel key={trip.id} trip={trip}/>
          ))}
        </div>
      )}

      {/* Add New Trip Button */}
      <CreateTripButton />
    </div>
  );
}
