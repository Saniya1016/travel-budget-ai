"use client";

import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function DayLabel({ day, index }) {
  const [openDay, setOpenDay] = useState(null);
  const [openMeal, setOpenMeal] = useState(null);

  const toggleDay = (index) => {
    setOpenDay(openDay === index ? null : index); // Toggle the day dropdown
  };

  const toggleMeal = (meal) => {
    setOpenMeal(openMeal === meal ? null : meal); // Toggle the meal dropdown
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      {/* Day Label */}
      <div
        className="flex flex-row items-center gap-x-3 text-lg font-bold text-gray-200 cursor-pointer transition duration-300 hover:text-blue-400"
        onClick={() => toggleDay(index)}
      >
        Day {index + 1} - {day.date}
        <IoMdArrowDropdown
          className={`transition-transform duration-300 ${
            openDay === index ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Day Details */}
      {openDay === index && (
        <div className="mt-3 bg-gray-900 rounded-lg p-4">
          {/* Morning */}
          <div
            className="flex flex-row items-center gap-x-3 cursor-pointer transition duration-300 hover:text-blue-400"
            onClick={() => toggleMeal("morning")}
          >
            <h4 className="font-semibold text-gray-200">Morning</h4>
            <IoMdArrowDropdown
              className={`transition-transform duration-300 ${
                openMeal === "morning" ? "rotate-180" : ""
              }`}
            />
          </div>

          {openMeal === "morning" && (
            <div className="ml-4 mt-2 bg-gray-800 p-3 rounded-lg shadow">
              <p className="text-gray-300">
                <span className="font-semibold">Breakfast:</span>{" "}
                {day.morning.breakfast.name} - $
                {day.morning.breakfast.cost.toFixed(2)}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Activity:</span>{" "}
                {day.morning.activity.name} - $
                {day.morning.activity.cost.toFixed(2)}
              </p>
            </div>
          )}

          {/* Afternoon */}
          <div
            className="flex flex-row items-center gap-x-3 cursor-pointer transition duration-300 hover:text-blue-400 mt-3"
            onClick={() => toggleMeal("afternoon")}
          >
            <h4 className="font-semibold text-gray-200">Afternoon</h4>
            <IoMdArrowDropdown
              className={`transition-transform duration-300 ${
                openMeal === "afternoon" ? "rotate-180" : ""
              }`}
            />
          </div>

          {openMeal === "afternoon" && (
            <div className="ml-4 mt-2 bg-gray-800 p-3 rounded-lg shadow">
              <p className="text-gray-300">
                <span className="font-semibold">Lunch:</span>{" "}
                {day.afternoon.lunch.name} - $
                {day.afternoon.lunch.cost.toFixed(2)}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Activity:</span>{" "}
                {day.afternoon.activity.name} - $
                {day.afternoon.activity.cost.toFixed(2)}
              </p>
            </div>
          )}

          {/* Evening */}
          <div
            className="flex flex-row items-center gap-x-3 cursor-pointer transition duration-300 hover:text-blue-400 mt-3"
            onClick={() => toggleMeal("evening")}
          >
            <h4 className="font-semibold text-gray-200">Evening</h4>
            <IoMdArrowDropdown
              className={`transition-transform duration-300 ${
                openMeal === "evening" ? "rotate-180" : ""
              }`}
            />
          </div>

          {openMeal === "evening" && (
            <div className="ml-4 mt-2 bg-gray-800 p-3 rounded-lg shadow">
              <p className="text-gray-300">
                <span className="font-semibold">Dinner:</span>{" "}
                {day.evening.dinner.name} - $
                {day.evening.dinner.cost.toFixed(2)}
              </p>
            </div>
          )}

          {/* Daily Totals */}
          <div className="mt-3 text-sm text-gray-400">
            <p>
              <span className="font-semibold">Daily Food Total:</span> $
              {day.daily_totals.food}
            </p>
            <p>
              <span className="font-semibold">Daily Activities Total:</span> $
              {day.daily_totals.activities}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
