const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const fetchApi = async (endpoint, userId=null, options={}) => {

    const url = `${BASE_URL}${endpoint}`;
    const defaultHeaders = (userId)? { 'Content-Type': 'application/json', 'userId': userId, } : { 'Content-Type': 'application/json' };

    try{

        const response = await fetch(url, {
            headers: defaultHeaders,
            ...options,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API Error');
          }
      
          return await response.json();

    } catch (error) {
        console.error(`Error during API call to ${endpoint}:`, error);
        throw error;
    }

}

export const api = {

    getAllTrips: (userId) => fetchApi(`/api/trips`, userId),

    createTrip: (tripData) => fetchApi(`/api/trips/create`, null, {
        method: 'POST',
        body: JSON.stringify(tripData),
    }),

    updateTrip: (tripId, newTripData) => fetchApi(`api/trips/${tripId}`, null, {
        method: 'PUT',
        body: JSON.stringify(newTripData),
    }),

    deleteTrip: (tripId, userId) => fetchApi(`api/trips/${tripId}`, null, {
        method: 'DELETE',
        body: JSON.stringify(userId),
    })

};