import { NextResponse } from "next/server";

//first get input body - start, end dates, budget, destination, preferences : {for now food - 50% activities-50%}
//send details to Google api
//get recommendations

//send the recommendations to openai with prompt
//fetch grouped results by day

export async function POST(request){
    try{
        const tripData = await request.json();
        console.log(tripData);
        const {startDate, endDate, destination, budget, preferences} = tripData;
        const duration = getTripDuration(startDate, endDate);

        //google api call
        const [lat, lng] = destination.split(',');
        const radius = 5000; // in meters, adjust based on your needs

        const food = await fetchPlaces({
            lat,
            lng,
            radius,
            type: "restaurant",
            budget,
            preferences: preferences.food,
            duration,
        });

        const activities = await fetchPlaces({
            lat,
            lng,
            radius,
            type: "tourist attraction",
            budget,
            preferences: preferences.activities,
            duration,
        });

        return NextResponse.json({ success: true, result: {food, activities} }, { status: 200 });

    } catch(error){
        console.error("Failed to Get Recommendations: ", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

function getTripDuration(startDate, endDate) {
    const start = new Date(startDate); // Convert startDate string to Date object
    const end = new Date(endDate); // Convert endDate string to Date object

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = end - start;

    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
    const durationInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return durationInDays;
}

async function fetchPlaces({ lat, lng, radius, type, keyword, budget, preferences, duration }) {
    
    const params = new URLSearchParams({
        location: `${lat},${lng}`,
        radius: radius.toString(),
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    });

    if (type) params.append("type", type);
    if (keyword) params.append("keyword", keyword);

    try{
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params.toString()}`);
        const data = await response.json();

        if (data.status !== "OK") {
            console.error("Failed to fetch places:", results);
            return [];
        }

        const results = data.results.map((place) => ({
            name: place.name,
            address: place.vicinity,
            rating: place.rating || 0,
            price_level: place.price_level || 0,
            opening_hours: place.opening_hours || "Not Available",
        }));

        const specificBudget = budget * (preferences.percent / 100);
        const dailyBudget = (specificBudget / duration).toFixed(2);

        const priceThresholds = {
            1: 30,   // $ - Up to $30/day (~$10/meal)
            2: 75,   // $$ - Up to $75/day (~$25/meal)
            3: 150,  // $$$ - Up to $150/day (~$50/meal)
            4: 300   // $$$$ - Over $150/day (>$50/meal)
        };

        let maxPriceLevel = 4;
        for (const [level, threshold] of Object.entries(priceThresholds)) {
            if (dailyBudget <= threshold) {
                maxPriceLevel = parseInt(level);
                break;
            }
        }

        return results.filter((place) => 
            !place.price_level || place.price_level <= maxPriceLevel
        );


    } catch(error){
        console.error("Error parsing response from Google Places:", error);
        return [];
    }
}