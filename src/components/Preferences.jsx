import { useEffect, useState } from "react";

export default function Preferences({ preferences, setPreferences }) {
  const [percentage, setPercentage] = useState(preferences.food.percent);
  const [foodTags, setFoodTags] = useState(preferences.food.tags);
  const [activityTags, setActivityTags] = useState(preferences.activities.tags);

  const handlePercentChange = (e) => {
    const value = parseInt(e.target.value);
    setPercentage(value);
  };

  const toggleTag = (tag, type) => {
    if (type === "food") {
      setFoodTags((prev) =>
        prev.includes(tag)
          ? prev.filter((item) => item !== tag)
          : [...prev, tag]
      );
    } else if (type === "activities") {
      setActivityTags((prev) =>
        prev.includes(tag)
          ? prev.filter((item) => item !== tag)
          : [...prev, tag]
      );
    }
  };

  useEffect(() => {
    setPreferences({
      ...preferences,
      food: { ...preferences.food, percent: percentage, tags: foodTags },
      activities: { ...preferences.activities, percent: 100 - percentage, tags: activityTags },
    });
  }, [percentage, foodTags, activityTags]);

  const foodOptions = [["Restaurants", "restaurant"], ["Cafes", "cafe"], ["Bars", "bar"]];
  const activityOptions = [
    ["Tourist Attractions", "tourist_attraction"],
    ["Amusement Parks", "amusement_park"],
    ["Aquarium", "aquarium"],
    ["Art", "art_gallery"],
    ["Museums", "museum"],
    ["Shopping", "shopping_mall"],
    ["Parks", "park"],
    ["Night Clubs", "night_club"],
    ["Zoo", "zoo"],
  ];

  return (
    <div className="flex flex-col items-start justify-center p-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg text-white max-w-3xl mx-auto">
      <h4 className="text-xl font-bold mb-6 text-gray-200">Budget Preferences</h4>

      {/* Slider */}
      <div className="w-full max-w-lg">
        <label className="block text-sm font-medium text-gray-400 mb-2">Allocate your budget</label>
        <input
          type="range"
          min="0"
          max="100"
          value={percentage}
          onChange={handlePercentChange}
          className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500 hover:bg-blue-600 focus:outline-none"
        />
        <div className="flex justify-between text-sm font-semibold text-gray-400 mt-2">
          <span className="text-blue-400">Food: {percentage}%</span>
          <span className="text-green-400">Activities: {100 - percentage}%</span>
        </div>
      </div>

      {/* Food Tags */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Food Preferences</h2>
        <div className="flex flex-wrap gap-3">
          {foodOptions.map(([label, value]) => (
            <div
              key={value}
              className={`flex items-center gap-x-2 px-3 py-1 bg-gray-700 hover:bg-blue-600 rounded-full cursor-pointer transition duration-200 ${
                foodTags.includes(value) ? "bg-blue-600 text-white" : "text-gray-300"
              }`}
              onClick={() => toggleTag(value, "food")}
            >
              <input
                type="checkbox"
                checked={foodTags.includes(value)}
                onChange={() => toggleTag(value, "food")}
                className="hidden"
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Tags */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Activity Preferences</h2>
        <div className="flex flex-wrap gap-3">
          {activityOptions.map(([label, value]) => (
            <div
              key={value}
              className={`flex items-center gap-x-2 px-3 py-1 bg-gray-700 hover:bg-green-600 rounded-full cursor-pointer transition duration-200 ${
                activityTags.includes(value) ? "bg-green-600 text-white" : "text-gray-300"
              }`}
              onClick={() => toggleTag(value, "activities")}
            >
              <input
                type="checkbox"
                checked={activityTags.includes(value)}
                onChange={() => toggleTag(value, "activities")}
                className="hidden"
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

