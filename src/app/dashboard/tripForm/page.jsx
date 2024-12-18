import TripForm from "@/components/TripForm"; // Import the Client Component
import { headers } from "next/headers";

export default async function page() {
  const headersList = await headers(); // Use headers on the server
  const userId = headersList.get("user-id"); // Get user-id from the headers

  return <TripForm userId={userId} />; // Pass userId as a prop to the Client Component
}
