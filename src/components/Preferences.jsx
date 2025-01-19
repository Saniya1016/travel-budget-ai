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
    <div className="flex flex-col items-start justify-center p-6 bg-gray-800 text-white">
      <h4 className="text-l font-bold mb-6 text-gray-400">Allocate a percentage of your budget:</h4>

      {/* Slider */}
      <div className="w-full max-w-lg text-center">
        <input
          type="range"
          min="0"
          max="100"
          value={percentage}
          onChange={handlePercentChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none mb-4"
        />
        <div className="flex justify-between text-sm font-semibold text-gray-400">
          <span className="text-blue-400">Food: {percentage}%</span>
          <span className="text-green-400">Activities: {100 - percentage}%</span>
        </div>
      </div>

      {/* Food Tags */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Food</h2>
        <div className="flex flex-wrap gap-2">
          {foodOptions.map((tag) => (
            <label key={tag[0]} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={foodTags.includes(tag[1])}
                onChange={() => toggleTag(tag[1], "food")}
                className="accent-blue-500"
              />
              <span>{tag[0]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Activity Tags */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Activity</h2>
        <div className="flex flex-wrap gap-2">
          {activityOptions.map((tag) => (
            <label key={tag[0]} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={activityTags.includes(tag[1])}
                onChange={() => toggleTag(tag[1], "activities")}
                className="accent-green-500"
              />
              <span>{tag[0]}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
