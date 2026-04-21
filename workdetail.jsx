import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const WorkoutDetail = () => {
  const { id } = useParams();
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const workout = state.workouts.find((w) => w.id === Number(id));

  if (!workout) return <div style={{ padding: "20px" }}><p>Not found!</p><button onClick={() => navigate("/")}>Go Back</button></div>;

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h1>📋 Workout Details</h1>
      <div style={{ border: "1px solid #28a745", borderRadius: "8px", padding: "20px", backgroundColor: "#f0fff4" }}>
        <h2>{workout.name}</h2>
        <p><strong>Type:</strong> {workout.type}</p>
        <p><strong>Duration:</strong> {workout.duration} mins</p>
        <p><strong>Calories:</strong> {workout.calories}</p>
        <p><strong>Status:</strong> {workout.completed ? "✅ Completed" : "❌ Pending"}</p>
      </div>
      <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>⬅ Back</button>
    </div>
  );
};

export default WorkoutDetail;
