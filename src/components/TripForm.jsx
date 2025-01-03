"use client";

import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { GeoPoint } from "firebase/firestore";
import { useRouter } from "next/navigation";

const libraries = ["places"];


export default function TripForm({userId}) {

    const router = useRouter();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const budgetRef = useRef(null);

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [inputRef, setInputRef] = useState(null);


    const handleAdd = async(e) => {
        //api call to add the trip
        //redirect to dashboard
        e.preventDefault();
        console.log(startDate, endDate, budgetRef.current.value, selectedPlace);

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trips/create`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  FromDate: startDate,
                  ToDate: endDate,
                  budget: budgetRef.current.value,
                  destination: selectedPlace,
                  userId: userId,
              }),
          });
          
          const resultData = await response.json();
          
          if (resultData.success) {
              router.push('/dashboard'); //=> redirect to dashboard
          } else {
              console.error(resultData.message);
              // Optionally, add user-facing error handling
          }
      } catch (error) {
          console.error("Error creating trip:", error);
          // Add error handling for network or other issues
      }


    }

    const handlePlaceChange = () => {
        const place = inputRef.getPlaces()[0];
        if (place) {
        const location = {
            name: place.formatted_address,
            coordinates: new GeoPoint(place.geometry.location.lat(), place.geometry.location.lng())
        };
        setSelectedPlace(location);
        console.log("Selected Place:", location);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-4">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">
            Plan Your Trip
          </h1>
          <form
            className="bg-gray-800/90 backdrop-blur-md p-8 rounded-lg shadow-2xl space-y-6 w-full max-w-lg"
            onSubmit={handleAdd}
          >
            {/* Destination */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium mb-2">
                Destination
              </label>
              <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} libraries={libraries}>
                <StandaloneSearchBox onLoad={(ref) => setInputRef(ref)} onPlacesChanged={handlePlaceChange}>
                  <input
                    type="text"
                    id="destination"
                    placeholder="Enter a city, state, or country"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                    required
                  />
                </StandaloneSearchBox>
              </LoadScript>
            </div>
    
            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-2">
                Budget ($)
              </label>
              <input
                type="number"
                id="budget"
                ref={budgetRef}
                placeholder="Enter budget"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                required
              />
            </div>
    
            {/* Start Date */}
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium mb-2">
                Start Date
              </label>
              <DatePicker
                id="start-date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                required
              />
            </div>
    
            {/* End Date */}
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium mb-2">
                End Date
              </label>
              <DatePicker
                id="end-date"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                dateFormat="yyyy-MM-dd"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                required
              />
            </div>
    
            {/* Submit Button */}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 hover:shadow-lg transition-all duration-300 font-semibold"
              type="submit"
            >
              Create Trip
            </button>
          </form>
        </div>
      );
}
