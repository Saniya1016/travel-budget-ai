//note: make sure to give remaining budget as budget to api/recommendation

import { api } from "@/lib/services/api";
import DayLabel from "./DayLabel";
import { useState } from "react";


export default function Recommendations({recommendations, setRecommendations, currentTripData}) {

    const [isLoading, setIsLoading] = useState(false);

    const handleGetRecommendations = async () => {

        const {FromDate, ToDate, destination, budget, spent} = currentTripData;

        const remainingBudget = budget - spent;

        //default preferences - temporary
        const preferences = { 
                            food: { percent: 50, tags: ["restaurant", "cafe"] },
                            activities: { percent: 50, tags: ["tourist_attraction"] }
                        };

        try{
            setIsLoading(true);
            const sendTripData = {
                        startDate: FromDate,
                        endDate: ToDate,
                        destination,
                        budget: remainingBudget,
                        preferences,
                    }
            const data = await api.getRecommendations(sendTripData);


            const dailyPlan = data.result;
            setRecommendations([...dailyPlan]);

        } catch(error){
            console.error(error);
            console.log("Failed to fetch iteneray: ", error.message);
        } finally{
            setIsLoading(false);
        }
    }

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Recommendations</h2>

      <ul className="space-y-2 mb-6">
        {
            recommendations.length > 0 ? (
                recommendations.map((recommendation, index) => (
                    <li key={index} className="bg-gray-700 p-4 rounded-lg">
                        <DayLabel day={recommendation} index={index}/>
                    </li>
                ))
            ): (
                <li className="text-gray-500 text-sm italic"> Hit The 'Generate Itenerary' button to see your itenerary!</li>
            )
        }
      </ul>

      <button
      onClick={handleGetRecommendations}
      className={`w-full sm:w-auto text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ${
        isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      }`}
      disabled={isLoading}
      > 
        {isLoading? "Generating ... " : "Generate Itenerary" } 
      </button>
    </div>
  )
}
