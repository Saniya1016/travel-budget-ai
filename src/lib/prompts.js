export const SYSTEM_PROPMT = `You are a travel planning expert who creates personalized daily itineraries. 
                        Your expertise includes:
                        - Balancing daily schedules between meals and activities
                        - Strategic timing of activities between meals
                        - Optimizing for highly-rated venues
                        - Maintaining variety in cuisine and activity types
                        - Ensuring all recommendations stay within budget constraints`;



export const generateUserPrompt = (duration, destination, preferences, budgetInfo, food, activities, dates) => {                        

        const userPrompt = `Create a ${duration}-day trip itinerary in ${destination} with the following parameters:

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
                    "breakfast": { "name": "Venue Name", "rating": X.X, "price_level": "X", "cost": $XX },
                    "activity": { "name": "Venue Name", "rating": X.X, "price_level": "X", "cost": $XX }
                    },
                    "afternoon": {
                    "lunch": { "name": "Venue Name", "rating": X.X, "price_level": "X", "cost": $XX },
                    "activity": { "name": "Venue Name", "rating": X.X, "price_level": "X", "cost": $XX }
                    },
                    "evening": {
                    "dinner": { "name": "Venue Name", "rating": X.X, "price_level": "X", "cost": $XX }
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

                ONLY return valid JSON as the output, with no additional text or commentary.

                IMPORTANT FORMAT RULES:
                1. Dates must be in exact order: ${dates.join(', ')}
                2. Price levels must be numbers (1, 2, 3, or 4), not $ symbols
                3. Costs must be numbers without $ symbol
                4. Ratings must be numbers between 0 and 5

                Example of REQUIRED format for one day:
                {
                "day1": {
                "date": "${dates[0]}",
                "morning": {
                "breakfast": { "name": "Venue Name", "rating": 4.5, "price_level": 2, "cost": 25 },
                "activity": { "name": "Venue Name", "rating": 4.3, "price_level": 3, "cost": 45 }
                },
                ...
                }
                }`;

        return userPrompt;
}