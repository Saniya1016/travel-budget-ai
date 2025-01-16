//note: make sure to give remaining budget as budget to api/recommendation

export default function Recommendations({recommendations, setRecommendations, currentTripData}) {

    const handleGetRecommendations = async () => {
        //post request to api/rec route
        const {FromDate, ToDate, destination, budget, spent} = currentTripData;

        const remainingBudget = budget - spent;

        //default preferences - temporary
        const preferences = { 
                            food: { percent: 50, tags: ["restaurant", "cafe"] },
                            activities: { percent: 50, tags: ["tourist_attraction"] }
                        };

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/recommendations`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    startDate: FromDate,
                    endDate: ToDate,
                    destination,
                    budget: remainingBudget,
                    preferences,
                })
            });

            const data = await response.json();
            if(data.status !== 'OK'){
                throw new Error("Error in fetching recommendations");
            }

        } catch(error){
            console.error(error);
            console.log("Failed to fetch iteneray: ", error.message);
        }
    }

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Recommendations</h2>

      <ul className="space-y-2 mb-6">
        {
            recommendations.length > 0 ? (
                recommendations.map((recommendation, index) => (
                    <li key={index}>

                    </li>
                ))
            ): (
                <li className="text-gray-500 text-sm italic"> Hit The 'Generate Itenerary' button to see your itenerary!</li>
            )
        }
      </ul>

      <button
      onClick={handleGetRecommendations}
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
      > Generate Itenerary </button>
    </div>
  )
}
