import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Stats = () => {
  const { state } = useContext(AppContext);
  const workouts = state.workouts;
  const total = workouts.length;
  const completed = workouts.filter((w) => w.completed).length;
  const totalCalories = workouts.reduce((acc, w) => acc + Number(w.calories || 0), 0);
  const totalDuration = workouts.reduce((acc, w) => acc + Number(w.duration || 0), 0);
  const byType = workouts.reduce((acc, w) => { const t = w.type || "Unknown"; acc[t] = (acc[t] || 0) + 1; return acc; }, {});

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Fitness Analytics</h1>
      <div style={{ backgroundColor: "#e8f5e9", padding: "20px", borderRadius: "8px", maxWidth: "350px", marginBottom: "20px" }}>
        <h3>Total Workouts: {total}</h3>
        <h3>Completed: {completed}</h3>
        <h3>Pending: {total - completed}</h3>
        <h3>Total Calories: {totalCalories}</h3>
        <h3>Total Duration: {totalDuration} mins</h3>
      </div>
      <h2>By Type:</h2>
      <ul>{Object.entries(byType).map(([t, c]) => <li key={t}>{t}: {c}</li>)}</ul>
    </div>
  );
};

export default Stats;
