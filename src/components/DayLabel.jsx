"use client";

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function DayLabel({day, index}) {

    const [openDay, setOpenDay] = useState(null);
    const [openMeal, setOpenMeal] = useState(null); 

    const toggleDay = (index) => {
        setOpenDay(openDay === index ? null : index); // Toggle the day dropdown
    };
    
    const toggleMeal = (meal) => {
        setOpenMeal(openMeal === meal ? null : meal); // Toggle the meal dropdown
    };

  return (
    <div>
        <div
            className="flex flex-row items-center gap-x-3 text-lg font-bold text-gray-200 cursor-pointer"
            onClick={() => toggleDay(index)}
        >
            Day {index + 1} - {day.date}
            <IoMdArrowDropdown />
        </div>

        {openDay === index && (
        <div className="mt-3 text-gray-300">
            {/* Morning */}
            <div className="flex flex-row items-center gap-x-3 cursor-pointer" onClick={() => toggleMeal("morning")}>
                <h4 className="font-semibold text-gray-200">Morning</h4>
                <IoMdArrowDropdown />
            </div>

            {openMeal === "morning" && (
            <div className="ml-4">
                <p>
                    <span className="font-semibold">Breakfast:</span> {day.morning.breakfast.name} - ${day.morning.breakfast.cost.toFixed(2)}
                </p>
                <p>
                    <span className="font-semibold">Activity:</span> {day.morning.activity.name} - ${day.morning.activity.cost.toFixed(2)}
                </p>
            </div>
            )}

            {/* Afternoon */}
            <div className="flex flex-row items-center gap-x-3 cursor-pointer" onClick={() => toggleMeal("afternoon")}>
                <h4 className="font-semibold text-gray-200 mt-2">Afternoon</h4>
                <IoMdArrowDropdown />
            </div>

            {openMeal === "afternoon" && (
            <div className="ml-4">
                <p>
                    <span className="font-semibold">Lunch:</span> {day.afternoon.lunch.name} - ${day.afternoon.lunch.cost.toFixed(2)}
                </p>
                <p>
                    <span className="font-semibold">Activity:</span> {day.afternoon.activity.name} - ${day.afternoon.activity.cost.toFixed(2)}
                </p>
            </div>

            )}

            {/* Evening */}
            <div className="flex flex-row items-center gap-x-3 cursor-pointer" onClick={() => toggleMeal("evening")}>
                <h4 className="font-semibold text-gray-200 mt-2">Evening</h4>
                <IoMdArrowDropdown />
            </div>
            {openMeal === "evening" && (
            <div className="ml-4">
                <p>
                    <span className="font-semibold">Dinner:</span> {day.evening.dinner.name} - ${day.evening.dinner.cost.toFixed(2)}
                </p>
            </div>
            )}

            {/* Daily totals */}
            <div className="mt-3 text-sm text-gray-400">
                <p>
                    <span className="font-semibold">Daily Food Total:</span> ${day.daily_totals.food}
                </p>
                <p>
                    <span className="font-semibold">Daily Activities Total:</span> ${day.daily_totals.activities}
                </p>
            </div>
        </div>
        )}
    </div>
  )
}
