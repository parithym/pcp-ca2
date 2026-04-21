import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Stats from "../pages/Stats";
import WorkoutDetail from "../pages/WorkoutDetail";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>🏠 Home</Link>
        <Link to="/favorites" style={styles.link}>⭐ Favorites</Link>
        <Link to="/stats" style={styles.link}>📊 Stats</Link>
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

const styles = {
  nav: {
    backgroundColor: "#28a745",
    padding: "10px 20px",
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default AppRouter;
