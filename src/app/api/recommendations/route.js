import { NextResponse } from "next/server";
import OpenAI from "openai";



const defaultTags = {

    food: [
        "restaurant", 
        "cafe",
        "bar"],

    activities: [
        "tourist_attraction",
        "amusement_park",
        "aquarium",
        "art_gallery",
        "museum",
        "shopping_mall",
        "park",
        "night_club",
        "zoo"]
};




export async function POST(request){

    try {

        const tripData = await request.json();
        const {startDate, endDate, destination, budget, preferences} = tripData;
        const foodPreferences = preferences.food;
        const activityPreferences = preferences.activities;
        const duration = getTripDuration(startDate, endDate);
        const [lat, lng] = destination.coordinates.split(',');
        const radius = 5000; // in meters

        const foodResults = await fetchPlaces({lat, lng, radius, type: 'food', budget, preferences: foodPreferences, duration});
        const activityResults = await fetchPlaces({lat, lng, radius, type: 'activities', budget, preferences: activityPreferences, duration}) ;

        const dailyPlan = await getAllocation(foodResults.places, 
                                                activityResults.places, 
                                                preferences, 
                                                duration,
                                                destination.name,
                                                {
                                                    food: foodResults.budgetInfo,
                                                    activities: activityResults.budgetInfo
                                                });

        return NextResponse.json({success: true, result: dailyPlan}, {status: 200});

        

    } catch(error){
        console.error(error);
        return NextResponse.json({success: false, message: error.message}, {status: 500});
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




function convertBudgetToPriceLevel(budget, duration, percentAllocation, type){

    const dailyBudget = (budget * (percentAllocation / 100)) / duration;

    const priceThresholds = {
        food: {
            // Per day thresholds (assuming 3 meals)
            1: 45,    // Up to $45/day (~$15 per meal)
            2: 90,    // Up to $90/day (~$30 per meal)
            3: 180,   // Up to $180/day (~$60 per meal)
            4: 300    // Over $180/day ($100+ per meal)
        },
        activities: {
            // Per day thresholds (assuming 1-2 activities)
            1: 50,    // Up to $50/day
            2: 100,   // Up to $100/day
            3: 200,   // Up to $200/day
            4: 400    // Over $200/day
        }
    };

    const thresholds = priceThresholds[type];
    let maxPriceLevel = 4;
    for (const [level, threshold] of Object.entries(thresholds)){
        if(dailyBudget <= threshold){
            maxPriceLevel = level;
            break;
        }
    }

    return {
        maxPriceLevel,
        TotalDailyBudget: dailyBudget,
        estimatedCosts: type === 'food' ? {
            perMeal: dailyBudget / 3,
            perDay: dailyBudget
        } : {
            perActivity: dailyBudget / 2,
            perDay: dailyBudget
        }
    };
}




async function fetchPlaces({lat, lng, radius, type, budget, preferences, duration}){

    const types = preferences.tags || defaultTags[type];
    const typeString = Array.isArray(types) ? types.join('|') : types;

    const params = new URLSearchParams({
        location: `${lat},${lng}`,
        radius: radius.toString(),
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    });

    if (typeString) {params.append("type", typeString);}

    try{

        const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params.toString()}`);
        const data = await response.json();

        if(data.status !== 'OK'){
            console.error("Failed to fetch places:", data);
            return [];
        }

        const results = data.results.map((place) => ({
            name: place.name,
            place_id: place.place_id,
            address: place.vicinity,
            rating: place.rating || 0,
            price_level: place.price_level || 0,
            opening_hours: place.opening_hours || "Not Available",
        }));

        const budgetInfo = convertBudgetToPriceLevel(budget, duration, preferences.percent, type);

        return {
            places: results.filter((place) => 
                !place.price_level || place.price_level <= budgetInfo.maxPriceLevel
            ),
            budgetInfo
        };

    } catch(error){
        console.error(error);
        return { places: [], budgetInfo: null };
    }
}


async function getAllocation(food, activities, preferences, duration, destination, budgetInfo) {
    const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API_KEY
    });

    const systemPrompt = `You are a travel planning expert who creates personalized daily itineraries. 
                        Your expertise includes:
                        - Balancing daily schedules between meals and activities
                        - Strategic timing of activities between meals
                        - Optimizing for highly-rated venues
                        - Maintaining variety in cuisine and activity types
                        - Ensuring all recommendations stay within budget constraints`;

    const userPrompt = `Create a ${duration}-day trip itinerary in Chicago with the following parameters:

                        BUDGET CONSTRAINTS:
                        Food (${preferences.food.percent}% of budget):
                        - Daily Budget: $${budgetInfo.food.TotalDailyBudget.toFixed(2)}
                        - Per meal estimate: $${budgetInfo.food.estimatedCosts.perMeal.toFixed(2)}
                        Price level guide: $ (<$15), $$ ($15-30), $$$ ($30-60), $$$$ (>$60)

                        Activities (${preferences.activities.percent}% of budget):
                        - Daily Budget: $${budgetInfo.activities.TotalDailyBudget.toFixed(2)}
                        - Per activity estimate: $${budgetInfo.activities.estimatedCosts.perActivity.toFixed(2)}
                        Price level guide: $ (<$25), $$ ($25-50), $$$ ($50-100), $$$$ (>$100)

                        AVAILABLE VENUES:
                        Restaurants:
                        ${food.map(f => `- ${f.name} (Rating: ${f.rating}, Price: ${f.price_level ? '$'.repeat(f.price_level) : 'N/A'})`).join('\n')}

                        Activities:
                        ${activities.map(a => `- ${a.name} (Rating: ${a.rating}, Price: ${a.price_level ? '$'.repeat(a.price_level) : 'N/A'})`).join('\n')}

                        REQUIREMENTS:
                        1. Each day must include:
                        - 3 meals (breakfast, lunch, dinner)
                        - 1-2 activities, balanced between morning and afternoon
                        2. Strictly adhere to daily budgets for both food and activities
                        3. Prioritize venues rated 4.0 or higher
                        4. No venue should be repeated across the itinerary
                        5. Account for a logical flow of locations throughout the day
                        6. Balance indoor and outdoor activities when possible

                        FORMAT EACH DAY AS FOLLOWS:
                        Day X - [Date]:
                        Morning:
                        - Breakfast: [Venue Name] (Rating: X.X, Price Level: $) - $XX
                        - Activity: [Venue Name] (Rating: X.X, Price Level: $) - $XX

                        Afternoon:
                        - Lunch: [Venue Name] (Rating: X.X, Price Level: $) - $XX
                        - Activity: [Venue Name] (Rating: X.X, Price Level: $) - $XX

                        Evening:
                        - Dinner: [Venue Name] (Rating: X.X, Price Level: $) - $XX

                        Daily Totals:
                        - Food: $XX / $${budgetInfo.food.TotalDailyBudget.toFixed(2)} budget
                        - Activities: $XX / $${budgetInfo.activities.TotalDailyBudget.toFixed(2)} budget

                        RETURN THE ITINERARY STRICTLY AS A JSON OBJECT WITH THIS FORMAT:
                        {
                        "dayX": {
                            "date": "YYYY-MM-DD",
                            "morning": {
                            "breakfast": { "name": "Venue Name", "rating": X.X, "price_level": "$", "cost": $XX },
                            "activity": { "name": "Venue Name", "rating": X.X, "price_level": "$", "cost": $XX }
                            },
                            "afternoon": {
                            "lunch": { "name": "Venue Name", "rating": X.X, "price_level": "$", "cost": $XX },
                            "activity": { "name": "Venue Name", "rating": X.X, "price_level": "$", "cost": $XX }
                            },
                            "evening": {
                            "dinner": { "name": "Venue Name", "rating": X.X, "price_level": "$", "cost": $XX }
                            },
                            "daily_totals": {
                            "food": "$XX",
                            "activities": "$XX",
                            "total_budget": {
                                "food": "$${budgetInfo.food.TotalDailyBudget.toFixed(2)}",
                                "activities": "$${budgetInfo.activities.TotalDailyBudget.toFixed(2)}"
                                }
                            }
                        },
                        ...
                        }

                        ONLY return valid JSON as the output, with no additional text or commentary.`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    "role": "system",
                    "content": systemPrompt
                },
                {
                    "role": "user",
                    "content": userPrompt
                }
            ],
            temperature: 0.7
        });
        const plan = JSON.parse(completion.choices[0].message.content);
        return plan;
        
    } catch (error) {
        console.error("Error getting OpenAI allocation:", error);
        throw error;
    }
}