import { api } from "@/lib/services/api";
import DayLabel from "./DayLabel";
import { useState } from "react";
import Preferences from "./Preferences";

export default function Recommendations({ recommendations, setRecommendations, currentTripData }) {
  const [isLoading, setIsLoading] = useState(false);

  const default_preferences = {
    food: { percent: 50, tags: ["restaurant", "cafe"] },
    activities: { percent: 50, tags: ["tourist_attraction"] },
  };

  const [preferences, setPreferences] = useState(default_preferences);

  const handleGetRecommendations = async () => {
    const { FromDate, ToDate, destination, budget, spent } = currentTripData;

    const remainingBudget = budget - spent;

    try {
      setIsLoading(true);
      const sendTripData = {
        startDate: FromDate,
        endDate: ToDate,
        destination,
        budget: remainingBudget,
        preferences,
      };
      const data = await api.getRecommendations(sendTripData);

      const dailyPlan = data.result;
      setRecommendations([...dailyPlan]);
    } catch (error) {
      console.error(error);
      console.log("Failed to fetch itinerary: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">Recommendations</h2>

      <div className="bg-gray-700 p-6 rounded-lg shadow-inner mb-6">
        <h4 className="text-xl font-semibold text-gray-200 mb-3">Preferences (Optional):</h4>
        <Preferences preferences={preferences} setPreferences={setPreferences} />
      </div>

      <ul className="space-y-4 mb-6">
        {recommendations.length > 0 ? (
          recommendations.map((recommendation, index) => (
            <li
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200"
            >
              <DayLabel day={recommendation} index={index} />
            </li>
          ))
        ) : (
          <li className="text-gray-400 text-center italic">
            Hit the &#39;Generate Itinerary&#39; button to see your itinerary!
          </li>
        )}
      </ul>

      <button
        onClick={handleGetRecommendations}
        className={`w-full sm:w-auto px-6 py-3 font-medium text-lg text-white rounded-lg shadow-lg transition-all duration-300 ${
          isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Itinerary"}
      </button>
    </div>
  );
}
