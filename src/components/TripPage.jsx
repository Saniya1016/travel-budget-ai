"use client";

import { useTrip } from "@/lib/TripContext";
import { useEffect, useState } from "react";
import Expenses from "./Expenses";
import Recommendations from "./Recommendations";


//make frontend to update trip features
//api call to update route

export default function TripPage() {

    const { currentTrip, setCurrentTrip } = useTrip();

    const [budget, setBudget] = useState(currentTrip.budget);
    const [spent, setSpent] = useState(currentTrip.spent);
    const [recommendations, setRecommendations] = useState(currentTrip.recommendations || []);
    const [expenses, setExpenses] = useState(currentTrip.expenses);

    const handleSaveChanges = async () => {
        try{

            const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trips/${currentTrip.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    ...currentTrip,
                    budget,
                    spent,
                    expenses,
                    recommendations,
                  })
            });

            if(!response.ok){
                throw new Error("Failed To Save Changes");
            }

            const data = await response.json();

            if(data.success){
                setCurrentTrip({
                    ...currentTrip,
                    budget,
                    spent,
                    expenses,
                    recommendations,
                });
                alert("Trip updated successfully!");

            } else {
                alert(`Error: ${data.message}`);
            }

        } catch(error){
            console.error('Error saving changes: ', error);
            alert("An error occurred while saving the changes.");
        }
    }

    useEffect(() => {
        const AmountSpent = expenses.reduce((accumulator, current) => accumulator + current.amount, 0);
        setSpent(AmountSpent);
    }, [expenses])


    if (!currentTrip) return (<div>No trip selected</div>);

    return (
        <div className="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-100 mb-6">Trip Details</h1>
    
          <div className="space-y-4">
            <p>
              <span className="font-medium text-gray-400">Destination:</span>{" "}
              {currentTrip.destination.name}
            </p>
            <p>
              <span className="font-medium text-gray-400">Budget:</span> ${budget}
            </p>
            <p>
              <span className="font-medium text-gray-400">Spent:</span> ${spent}
            </p>
            <p>
              <span className="font-medium text-gray-400">Remaining:</span> $
              {(budget - spent).toFixed(2)}
            </p>
          </div>
    
          <Expenses expenses={expenses} setExpenses={setExpenses} />

          <Recommendations recommendations={recommendations} setRecommendations={setRecommendations} currentTripData={currentTrip}/>
    
          <button
            onClick={handleSaveChanges}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 w-full sm:w-auto"
          >
            Save Changes
          </button>

        </div>
      );
}
