"use client";

import { useTrip } from "@/lib/TripContext";
import { useEffect, useState } from "react";
import { api } from "@/lib/services/api";
import Expenses from "./Expenses";
import Recommendations from "./Recommendations";
import BudgetGraph from "./BudgetGraph";


//make frontend to update trip features
//api call to update route

export default function TripPage() {

    const { currentTrip, setCurrentTrip } = useTrip();

    const [budget, setBudget] = useState(0);
    const [spent, setSpent] = useState(0);
    const [recommendations, setRecommendations] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const handleSaveChanges = async () => {
        try {

            const newTripData = {
              ...currentTrip,
              budget,
              spent,
              expenses,
              recommendations,
            }

            const data = await api.updateTrip(currentTrip.id, newTripData);

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
      if (currentTrip) {
        localStorage.setItem("currentTrip", JSON.stringify(currentTrip));
      }
    }, [currentTrip]);
    
    useEffect(() => {
      const savedTrip = localStorage.getItem("currentTrip");
      if (savedTrip) {
        const parsedTrip = JSON.parse(savedTrip);
        setCurrentTrip(parsedTrip);
        setBudget(parsedTrip.budget);
        setSpent(parsedTrip.spent);
        setRecommendations(parsedTrip.recommendations || []);
        setExpenses(parsedTrip.expenses || []);
      }
    }, []);
    

    useEffect(() => {
        const AmountSpent = expenses.reduce((accumulator, current) => accumulator + current.amount, 0);
        setSpent(AmountSpent);
    }, [expenses])


    if (!currentTrip) return (<div>No trip selected</div>);

    return (
        <div className="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md max-w-3xl mx-auto">

          <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-semibold text-gray-100 mb-6">Trip Details</h1>
            <BudgetGraph budget={budget} spent={spent}/>
          </div>
    
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
