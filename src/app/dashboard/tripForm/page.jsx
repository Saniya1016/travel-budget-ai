"use client";

import { useRef, useState } from "react";
import DatePicker from "react-datepicker";


export default function page() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const budgetRef = useRef(null);
    const destinationRef = useRef(null);

  return (
    <div>
      <h1>Enter Your Trip Details</h1>
      <form>
        <div>
            <label>Destination</label>
            <input
                type="text"
                id="destination"
                ref={destinationRef}
                placeholder="Enter destination"
                required
            />
        </div>

        <div>
            <label>Budget($)</label>
            <input
                type="number"
                id="budget"
                ref={budgetRef}
                placeholder="Enter budget"
                required
            />
        </div>

        <button type="submit">
            Create Trip
        </button>

      </form>
    </div>
  )
}
