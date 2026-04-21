import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Stats from "../pages/Stats";
import WorkoutDetail from "../pages/WorkoutDetail";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <nav style={{ backgroundColor: "#28a745", padding: "10px 20px", display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>🏠 Home</Link>
        <Link to="/favorites" style={{ color: "white", textDecoration: "none" }}>⭐ Favorites</Link>
        <Link to="/stats" style={{ color: "white", textDecoration: "none" }}>📊 Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/workout/:id" element={<WorkoutDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
