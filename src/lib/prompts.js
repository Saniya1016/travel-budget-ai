export const SYSTEM_PROPMT = `You are a travel planning expert who creates personalized daily itineraries. 
                        Your expertise includes:
                        - Balancing daily schedules between meals and activities
                        - Strategic timing of activities between meals
                        - Optimizing for highly-rated venues
                        - Maintaining variety in cuisine and activity types
                        - Ensuring all recommendations stay within budget constraints`;



export const generateUserPrompt = (duration, destination, preferences, budgetInfo, food, activities, dates) => {
    const userPrompt = `Create a ${duration}-day ${destination} itinerary as JSON matching this exact structure:
                        {
                        "day1": {
                            "date": "YYYY-MM-DD",
                            "morning": {
                            "breakfast": {"name": "string", "rating": number, "price_level": number, "cost": number},
                            "activity": {"name": "string", "rating": number, "price_level": number, "cost": number}
                            },
                            "afternoon": {
                            "lunch": {"name": "string", "rating": number, "price_level": number, "cost": number},
                            "activity": {"name": "string", "rating": number, "price_level": number, "cost": number}
                            },
                            "evening": {
                            "dinner": {"name": "string", "rating": number, "price_level": number, "cost": number}
                            },
                            "daily_totals": {
                            "food": number,
                            "activities": number,
                            "total_budget": {
                                "food": ${budgetInfo.food.TotalDailyBudget},
                                "activities": ${budgetInfo.activities.TotalDailyBudget}
                            }
                            }
                        }
                        }

                        Budget Limits:
                        - Food (${preferences.food.percent}%): $${budgetInfo.food.TotalDailyBudget}/day ($${budgetInfo.food.estimatedCosts.perMeal}/meal)
                        - Activities (${preferences.activities.percent}%): $${budgetInfo.activities.TotalDailyBudget}/day ($${budgetInfo.activities.estimatedCosts.perActivity}/activity)

                        Available Venues:
                        Food: ${food.map(f => `${f.name}|${f.rating}|${f.price_level || 'NA'}`).join(', ')}
                        Activities: ${activities.map(a => `${a.name}|${a.rating}|${a.price_level || 'NA'}`).join(', ')}

                        Rules:
                        1. Each day: 3 meals + 1-2 activities
                        2. Use venues rated ≥4.0 only
                        3. No repeating venues
                        4. Price levels: 1($<15/25), 2($15-30/25-50), 3($30-60/50-100), 4($>60/100)
                        5. Dates order: ${dates.join(', ')}

                        Return only valid JSON. No explanations.`;

    return userPrompt;
};