"use client";

import { useTrip } from "@/lib/TripContext";
import { useEffect, useState } from "react";
import Expenses from "./Expenses";

export default function TripPage() {

    const { currentTrip } = useTrip();
    console.log(currentTrip);

    //note: might need to use useEffect hook for side effect change to remainder => budget-spent

    const [budget, setBudget] = useState(currentTrip.budget);
    const [spent, setSpent] = useState(currentTrip.spent);
    const [expenses, setExpenses] = useState(currentTrip.expenses);

    const handleSaveChanges = () => {

    }

    useEffect(() => {
        const AmountSpent = expenses.reduce((accumulator, current) => accumulator + current.amount, 0);
        setSpent(AmountSpent);
    }, [expenses])


    if (!currentTrip) return (<div>No trip selected</div>);

    //make frontend to update trip features
    //api call to update route
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
