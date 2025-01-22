const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const fetchApi = async (endpoint, userId=null, options={}) => {

    const url = `${BASE_URL}${endpoint}`;
    const defaultHeaders = (userId)? { 'Content-Type': 'application/json', 'userId': userId, } : { 'Content-Type': 'application/json' };

    try{

        const response = await fetch(url, {
            headers: defaultHeaders,
            mode: 'cors',
            credentials: 'include', // Ensures cookies are sent with the request
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

    updateTrip: (tripId, newTripData) => fetchApi(`/api/trips/${tripId}`, null, {
        method: 'PUT',
        body: JSON.stringify(newTripData),
    }),

    deleteTrip: (tripId, userId) => fetchApi(`/api/trips/${tripId}`, null, {
        method: 'DELETE',
        body: JSON.stringify({userId}),
    }),

    getRecommendations: (tripData) => fetchApi(`/api/recommendations`, null, {
        method: 'POST',
        body: JSON.stringify(tripData),
    }),

    loginUser: (credentials) => fetchApi(`/api/login`, null, {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),

    logoutUser: (token) => fetchApi(`/api/logout`, null, {
        method: 'POST',
        body: JSON.stringify(token),
    }),
};





// const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// const fetchApi = async (endpoint, userId = null, options = {}) => {
//     const url = `${BASE_URL}${endpoint}`;
    
//     // Merge default headers with any custom headers from options
//     const defaultHeaders = {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         ...(userId && { 'userId': userId }),
//         // Add any custom headers from options
//         ...(options.headers || {})
//     };

//     try {
//         const response = await fetch(url, {
//             ...options,
//             headers: defaultHeaders,
//             credentials: 'include', // Important for CORS
//             mode: 'cors', // Explicitly set CORS mode
//         });

//         // Handle different types of responses
//         const contentType = response.headers.get('content-type');
        
//         if (!response.ok) {
//             // Try to parse error response
//             if (contentType?.includes('application/json')) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'API Error');
//             } else {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//         }

//         // Handle successful response
//         if (contentType?.includes('application/json')) {
//             return await response.json();
//         } else {
//             return await response.text();
//         }

//     } catch (error) {
//         console.error(`Error during API call to ${endpoint}:`, error);
//         // Enhance error message for CORS issues
//         if (error.message.includes('Failed to fetch')) {
//             throw new Error(`Network error: Please check your connection and CORS configuration. ${error.message}`);
//         }
//         throw error;
//     }
// };

// export const api = {
//     getAllTrips: (userId) => fetchApi('/api/trips', userId),

//     createTrip: (tripData) => fetchApi('/api/trips/create', null, {
//         method: 'POST',
//         body: JSON.stringify(tripData),
//     }),

//     updateTrip: (tripId, newTripData) => fetchApi(`/api/trips/${tripId}`, null, {
//         method: 'PUT',
//         body: JSON.stringify(newTripData),
//     }),

//     deleteTrip: (tripId, userId) => fetchApi(`/api/trips/${tripId}`, null, {
//         method: 'DELETE',
//         body: JSON.stringify({ userId }),
//     }),

//     getRecommendations: (tripData) => fetchApi('/api/recommendations', null, {
//         method: 'POST',
//         body: JSON.stringify(tripData),
//     }),

//     loginUser: (credentials) => fetchApi('/api/login', null, {
//         method: 'POST',
//         body: JSON.stringify(credentials),
//     }),

//     logoutUser: (token) => fetchApi('/api/logout', null, {
//         method: 'POST',
//         body: JSON.stringify({ token }),
//     }),
// };