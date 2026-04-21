
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const WorkoutCard = ({ workout }) => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", margin: "10px", width: "250px", display: "inline-block", verticalAlign: "top" }}>
      <h3>{workout.name}</h3>
      <p>Type: {workout.type}</p>
      <p>Duration: {workout.duration} mins</p>
      <p>Calories: {workout.calories}</p>
      <p>{workout.completed ? "✅ Completed" : "❌ Pending"}</p>
      <button onClick={() => navigate(`/workout/${workout.id}`)}>View</button>
      <button onClick={() => dispatch({ type: "TOGGLE_COMPLETED", payload: workout.id })}>Toggle</button>
      <button onClick={() => dispatch({ type: "ADD_FAVORITE", payload: workout })}>⭐</button>
      <button onClick={() => dispatch({ type: "DELETE_WORKOUT", payload: workout.id })} style={{ color: "red" }}>Delete</button>
    </div>
  );
};

export default WorkoutCard;
