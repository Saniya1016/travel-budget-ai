"use client";

import { useState } from "react";

export default function Expenses({expenses, setExpenses}) {

  
  const [expenseInput, setExpenseInput] = useState({amount: "", category: ""});

  const handleAddExpense = () => {
    if (!expenseInput.amount || isNaN(expenseInput.amount)) return;
    const newExpense = { amount: parseFloat(expenseInput.amount), category: expenseInput.category };
    setExpenses([...expenses, newExpense]);
    setExpenseInput({ amount: "", category: "food" });
  }

  return (

    <div>

      <h2>Expenses</h2>

      {/* display expenses */}
      <ul>
        {
          expenses.map((expense, index) => (
            <li key={index}>
              {expense.category}: ${expense.amount}
            </li>
          ))
        }
      </ul>

      {/* add expense */}
      <div>
        <input 
          type="number"
          placeholder="Amount"
          value={expenseInput.amount}
          onChange={(e) => setExpenseInput({...expenseInput, amount: e.target.value})}
        />

        <select
          value={expenseInput.category}
          placeholder="Category"
          onChange={(e) => setExpenseInput({...expenseInput, category: e.target.value})}
        >
          <option value="food">Food</option>
          <option value="activities">Activities</option>
          <option value="other">Other</option>

        </select>
      </div>

      <button onClick={handleAddExpense}>
        Add Expense
      </button>

    </div>
  )
}
