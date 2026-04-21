import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import WorkoutCard from "../components/WorkoutCard";

const Home = () => {
  const { state, dispatch } = useContext(AppContext);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!/^[a-zA-Z ]+$/.test(name)) { setError("Name must contain letters only!"); return; }
    if (!/^\d+$/.test(duration)) { setError("Duration must be a number!"); return; }
    if (!type) { setError("Please enter a type!"); return; }
    setError("");
    const newWorkout = { id: Date.now(), name, type, duration, calories, completed: false };
    dispatch({ type: "ADD_WORKOUT", payload: newWorkout });
    setName(""); setType(""); setDuration(""); setCalories("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>💪 Fitness Tracker</h1>
      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px", maxWidth: "400px", marginBottom: "20px" }}>
        <h2>Add New Workout</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="text" placeholder="Workout Name" value={name} onChange={(e) => setName(e.target.value)} style={{ display: "block", width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input type="text" placeholder="Type (Cardio / Strength)" value={type} onChange={(e) => setType(e.target.value)} style={{ display: "block", width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input type="text" placeholder="Duration (mins)" value={duration} onChange={(e) => setDuration(e.target.value)} style={{ display: "block", width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input type="text" placeholder="Calories Burned" value={calories} onChange={(e) => setCalories(e.target.value)} style={{ display: "block", width: "100%", padding: "8px", margin: "8px 0", borderRadius: "4px", border: "1px solid #ccc" }} />
        <button onClick={handleSubmit} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Add Workout</button>
      </div>

      <h2>All Workouts ({state.workouts.length})</h2>
      {state.workouts.length === 0 ? (
        <p>No workouts yet. Add one above!</p>
      ) : (
        state.workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))
      )}
    </div>
  );
};

export default Home;
