import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const WorkoutCard = ({ workout }) => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch({ type: "DELETE_WORKOUT", payload: workout.id });
  };

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_COMPLETED", payload: workout.id });
  };

  const handleFavorite = () => {
    dispatch({ type: "ADD_FAVORITE", payload: workout });
  };

  return (
    <div style={styles.card}>
      <h3>{workout.name}</h3>
      <p>Type: {workout.type}</p>
      <p>Duration: {workout.duration} mins</p>
      <p>Calories: {workout.calories}</p>
      <p>Status: {workout.completed ? "✅ Completed" : "❌ Pending"}</p>

      <button onClick={() => navigate(`/workout/${workout.id}`)}>View Details</button>
      <button onClick={handleToggle}>Toggle Complete</button>
      <button onClick={handleFavorite}>⭐ Favorite</button>
      <button onClick={handleDelete} style={{ color: "red" }}>Delete</button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "10px",
    width: "250px",
    display: "inline-block",
    verticalAlign: "top",
  },
};

export default WorkoutCard;
