import { headers } from "next/headers";
// import { redirect } from "next/navigation";

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
    <div>
      <h1>Dashboard</h1>
      {trips.length === 0 ? (
        <p>No trips found. Start planning your next adventure!</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              <p>Destination: {trip.destination}</p>
              <p>Budget: ${trip.budget}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
