import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Stats = () => {
  const { state } = useContext(AppContext);
  const workouts = state.workouts;

  // Total workouts
  const total = workouts.length;

  // Completed workouts
  const completedCount = workouts.filter((w) => w.completed === true).length;

  // Total calories burned using reduce
  const totalCalories = workouts.reduce((acc, w) => acc + Number(w.calories || 0), 0);

  // Total duration using reduce
  const totalDuration = workouts.reduce((acc, w) => acc + Number(w.duration || 0), 0);

  // Group by type using reduce
  const byType = workouts.reduce((acc, w) => {
    const type = w.type || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Fitness Analytics</h1>

      <div style={styles.statBox}>
        <h3>Total Workouts: {total}</h3>
        <h3>Completed: {completedCount}</h3>
        <h3>Pending: {total - completedCount}</h3>
        <h3>Total Calories Burned: {totalCalories}</h3>
        <h3>Total Duration: {totalDuration} mins</h3>
      </div>

      <h2>Workouts by Type:</h2>
      {Object.keys(byType).length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <ul>
          {Object.entries(byType).map(([type, count]) => (
            <li key={type}>
              {type}: {count} workout(s)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  statBox: {
    backgroundColor: "#e8f5e9",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "350px",
    marginBottom: "20px",
  },
};

export default Stats;
