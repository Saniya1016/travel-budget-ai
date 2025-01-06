"use client";

import { useTrip } from "@/lib/TripContext";
import { useEffect, useState } from "react";
import Expenses from "./Expenses";


//make frontend to update trip features
//api call to update route

export default function TripPage() {

    const { currentTrip, setCurrentTrip } = useTrip();

    const [budget, setBudget] = useState(currentTrip.budget);
    const [spent, setSpent] = useState(currentTrip.spent);
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
        <div>

            <h1>Trip Details</h1>

            <p>
                <span className="font-medium">Destination:</span>{" "}
                {currentTrip.destination.name}
            </p>

            <p>
                <span className="font-medium">Budget:</span> ${budget}
            </p>

            <p>
                <span className="font-medium">Spent:</span> ${spent}
            </p>

            <p>
                <span className="font-medium">Remaining:</span> ${budget - spent}
            </p>


            <Expenses expenses={expenses} setExpenses={setExpenses}/>

            <button onClick={handleSaveChanges}>
                Save Changes
            </button>
            
        </div>
    );
}
