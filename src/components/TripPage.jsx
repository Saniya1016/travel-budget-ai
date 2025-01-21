// "use client";

// import { useTrip } from "@/lib/TripContext";
// import { useEffect, useState } from "react";
// import { api } from "@/lib/services/api";
// import Expenses from "./Expenses";
// import Recommendations from "./Recommendations";
// import BudgetGraph from "./BudgetGraph";


// //make frontend to update trip features
// //api call to update route

// export default function TripPage() {

//     const { currentTrip, setCurrentTrip } = useTrip();

//     const [budget, setBudget] = useState(0);
//     const [spent, setSpent] = useState(0);
//     const [recommendations, setRecommendations] = useState([]);
//     const [expenses, setExpenses] = useState([]);

//     const handleSaveChanges = async () => {
//         try {

//             const newTripData = {
//               ...currentTrip,
//               budget,
//               spent,
//               expenses,
//               recommendations,
//             }

//             const data = await api.updateTrip(currentTrip.id, newTripData);

//             if(data.success){
//                 setCurrentTrip({
//                     ...currentTrip,
//                     budget,
//                     spent,
//                     expenses,
//                     recommendations,
//                 });
//                 alert("Trip updated successfully!");

//             } else {
//                 alert(`Error: ${data.message}`);
//             }

//         } catch(error){
//             console.error('Error saving changes: ', error);
//             alert("An error occurred while saving the changes.");
//         }
//     }

//     useEffect(() => {
//       if (currentTrip) {
//         localStorage.setItem("currentTrip", JSON.stringify(currentTrip));
//       }
//     }, [currentTrip]);
    
//     useEffect(() => {
//       const savedTrip = localStorage.getItem("currentTrip");
//       if (savedTrip) {
//         const parsedTrip = JSON.parse(savedTrip);
//         setCurrentTrip(parsedTrip);
//         setBudget(parsedTrip.budget);
//         setSpent(parsedTrip.spent);
//         setRecommendations(parsedTrip.recommendations || []);
//         setExpenses(parsedTrip.expenses || []);
//       }
//     }, []);
    

//     useEffect(() => {
//         const AmountSpent = expenses.reduce((accumulator, current) => accumulator + current.amount, 0);
//         setSpent(AmountSpent);
//     }, [expenses])


//     if (!currentTrip) return (<div>No trip selected</div>);

//     return (
//         <div className="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md max-w-3xl mx-auto">

//           <div className="flex flex-row justify-between">
//             <h1 className="text-3xl font-semibold text-gray-100 mb-6">Trip Details</h1>
//             <BudgetGraph budget={budget} spent={spent}/>
//           </div>
    
//           <div className="space-y-4">
//             <p>
//               <span className="font-medium text-gray-400">Destination:</span>{" "}
//               {currentTrip.destination.name}
//             </p>
//             <p>
//               <span className="font-medium text-gray-400">Budget:</span> ${budget}
//             </p>
//             <p>
//               <span className="font-medium text-gray-400">Spent:</span> ${spent}
//             </p>
//             <p>
//               <span className="font-medium text-gray-400">Remaining:</span> $
//               {(budget - spent).toFixed(2)}
//             </p>
//           </div>
    
//           <Expenses expenses={expenses} setExpenses={setExpenses} />

//           <Recommendations recommendations={recommendations} setRecommendations={setRecommendations} currentTripData={currentTrip}/>
    
//           <button
//             onClick={handleSaveChanges}
//             className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 w-full sm:w-auto"
//           >
//             Save Changes
//           </button>

//         </div>
//       );
// }

"use client";

import { useTrip } from "@/lib/TripContext";
import { useEffect, useState } from "react";
import { api } from "@/lib/services/api";
import Expenses from "./Expenses";
import Recommendations from "./Recommendations";
import BudgetGraph from "./BudgetGraph";

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
      };

      const data = await api.updateTrip(currentTrip.id, newTripData);

      if (data.success) {
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
    } catch (error) {
      console.error("Error saving changes: ", error);
      alert("An error occurred while saving the changes.");
    }
  };

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
  }, [setCurrentTrip]);

  useEffect(() => {
    const AmountSpent = expenses.reduce(
      (accumulator, current) => accumulator + current.amount,
      0
    );
    setSpent(AmountSpent);
  }, [expenses]);

  if (!currentTrip) return <div>No trip selected</div>;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 rounded-2xl shadow-2xl max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-gray-100">Trip Details</h1>
        <BudgetGraph budget={budget} spent={spent} />
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <p>
          <span className="text-lg font-medium text-gray-400">Destination:</span>{" "}
          <span className="text-xl font-semibold text-gray-200">
            {currentTrip.destination.name}
          </span>
        </p>
        <p>
          <span className="text-lg font-medium text-gray-400">Budget:</span>{" "}
          <span className="text-xl font-semibold text-green-400">
            ${budget.toLocaleString()}
          </span>
        </p>
        <p>
          <span className="text-lg font-medium text-gray-400">Spent:</span>{" "}
          <span className="text-xl font-semibold text-red-400">
            ${spent.toLocaleString()}
          </span>
        </p>
        <p>
          <span className="text-lg font-medium text-gray-400">
            Remaining Budget:
          </span>{" "}
          <span className="text-xl font-semibold text-blue-400">
            ${(budget - spent).toFixed(2).toLocaleString()}
          </span>
        </p>
      </div>

      <div className="space-y-6">
        <Expenses expenses={expenses} setExpenses={setExpenses} />
        <Recommendations
          recommendations={recommendations}
          setRecommendations={setRecommendations}
          currentTripData={currentTrip}
        />
      </div>

      <button
        onClick={handleSaveChanges}
        className="w-full sm:w-auto py-3 px-6 bg-green-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-green-500 focus:ring-4 focus:ring-green-300 transition-all"
      >
        Save Changes
      </button>
    </div>
  );
}

