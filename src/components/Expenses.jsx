"use client";

import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Expenses({expenses, setExpenses}) {

  
  const [expenseInput, setExpenseInput] = useState({amount: "", category: "food"});

  const handleAddExpense = () => {
    if (!expenseInput.amount || isNaN(expenseInput.amount)) return;
    const newExpense = { amount: parseFloat(expenseInput.amount), category: expenseInput.category };
    setExpenses([...expenses, newExpense]);
    setExpenseInput({ amount: "", category: "food" });
  }

  const handleDeleteExpense = (removeIndex) => {
    const updatedExpenses = expenses.filter((exp,index) => index !== removeIndex);
    setExpenses([...updatedExpenses]);
  }

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Expenses</h2>

      {/* Display expenses */}
      <ul className="space-y-2 mb-6">
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-700 p-3 rounded-lg shadow-sm"
            >
              <span className="font-medium text-gray-200">{expense.category}</span>
              <span className="text-gray-300">${expense.amount.toFixed(2)}</span>
              <button 
                onClick={() => handleDeleteExpense(index)} 
                className="text-red-600 hover:text-red-800 transition-colors duration-200 p-2 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
                aria-label="Delete"
              >
                <RiDeleteBin6Line className="w-5 h-5" />
            </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-sm italic">No expenses added yet.</li>
        )}
      </ul>

      {/* Add expense form */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            placeholder="Amount"
            value={expenseInput.amount}
            onChange={(e) => setExpenseInput({ ...expenseInput, amount: e.target.value })}
            className="w-full sm:w-auto p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />

          <select
            value={expenseInput.category}
            onChange={(e) => setExpenseInput({ ...expenseInput, category: e.target.value })}
            className="w-full sm:w-auto p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="food">Food</option>
            <option value="activities">Activities</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          onClick={handleAddExpense}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}
