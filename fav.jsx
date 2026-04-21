
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Favorites = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div style={{ padding: "20px" }}>
      <h1>⭐ Favorite Workouts</h1>
      {state.favorites.length === 0 ? <p>No favorites yet!</p> : (
        state.favorites.map((w) => (
          <div key={w.id} style={{ border: "1px solid gold", borderRadius: "8px", padding: "16px", margin: "10px", width: "250px", display: "inline-block", verticalAlign: "top", backgroundColor: "#fffde7" }}>
            <h3>{w.name}</h3>
            <p>Type: {w.type}</p>
            <p>Duration: {w.duration} mins</p>
            <button onClick={() => dispatch({ type: "REMOVE_FAVORITE", payload: w.id })} style={{ color: "red" }}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
