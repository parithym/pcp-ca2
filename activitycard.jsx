import { Link } from "react-router-dom";
import { normalise, useActivity } from "../context/ActivityContext";

/**
 * Reusable activity card.
 * data-testid="activity-item" on each card.
 * Q4: shows toggle button for goalAchieved.
 */
export default function ActivityCard({ activity, showToggle = false }) {
  const { dispatch } = useActivity();
  const a = normalise(activity);

  const displayName = a.name || "Unknown";
  const displayDate = a.date || "No date";

  function handleToggle(e) {
    e.preventDefault(); // don't navigate to detail page
    dispatch({ type: "TOGGLE_GOAL", payload: a.id });
  }

  return (
    <Link
      to={`/activities/${a.id}`}
      className="activity-card"
      data-testid="activity-item"
    >
      <div className="activity-card-top">
        <span className="activity-id">{a.id}</span>
        <span className={`badge badge-${a.goalAchieved ? "achieved" : "notachieved"}`}>
          {a.goalAchieved ? "✓ Achieved" : "✗ Not Achieved"}
        </span>
      </div>

      <h3 className="activity-name">{displayName}</h3>

      <div className="activity-stats-row">
        <div className="activity-stat">
          <span className="stat-icon">👟</span>
          <span className="stat-value">{typeof a.steps === "number" ? a.steps.toLocaleString() : "—"}</span>
          <span className="stat-label">Steps</span>
        </div>
        <div className="activity-stat">
          <span className="stat-icon">🔥</span>
          <span className="stat-value">{typeof a.caloriesBurnt === "number" ? a.caloriesBurnt.toLocaleString() : "—"}</span>
          <span className="stat-label">Cal</span>
        </div>
        <div className="activity-stat">
          <span className="stat-icon">⏱️</span>
          <span className="stat-value">{typeof a.workoutMinutes === "number" ? a.workoutMinutes : "—"}</span>
          <span className="stat-label">Min</span>
        </div>
      </div>

      <div className="activity-card-footer">
        <span className="activity-date">📅 {displayDate}</span>
        {/* Q4: toggle button — only shown on /activities page */}
        {showToggle && (
          <button
            className={`btn-toggle ${a.goalAchieved ? "btn-toggle-achieved" : "btn-toggle-not"}`}
            onClick={handleToggle}
            title={
              typeof a.steps === "number" && a.steps >= 8000
                ? "Steps ≥ 8000: goal auto-achieved"
                : a.goalAchieved
                ? "Mark as Not Achieved"
                : "Mark as Achieved"
            }
          >
            {typeof a.steps === "number" && a.steps >= 8000
              ? "🔒 Auto"
              : a.goalAchieved
              ? "✓ Toggle"
              : "✗ Toggle"}
          </button>
        )}
      </div>
    </Link>
  );
}
