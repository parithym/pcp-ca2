import { createContext, useContext, useReducer, useEffect } from "react";
import { mockActivitiesData } from "../data/mockActivities";

// ── Context ──────────────────────────────────────────────────────────────────
export const ActivityContext = createContext();

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState = {
  activities: [],   // raw data from API – single source of truth
  loading: true,
  error: null,
};

// ── Reducer ───────────────────────────────────────────────────────────────────
function activityReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVITIES":
      return { ...state, activities: action.payload, loading: false, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "TOGGLE_GOAL": {
      let changed = false;

      const updated = state.activities.map((a) => {
        const aid = a.activityid ?? a.activityId ?? a.id ?? "";

        // Not the target activity — leave untouched
        if (String(aid) !== String(action.payload)) return a;

        // Edge case: invalid activity (steps not a number) → ignore
        if (typeof a.steps !== "number") return a;

        const current = a.goalachieved ?? a.goalAchieved ?? false;

        // Business logic: steps >= 8000 must always be true
        const next = a.steps >= 8000 ? true : !current;

        // Edge case: already the correct value → no duplicate update
        if (next === current) return a;

        changed = true;
        // Must not directly modify state — return new object
        return { ...a, goalachieved: next, goalAchieved: next };
      });

      // Return same state reference if nothing changed (avoids re-render)
      return changed ? { ...state, activities: updated } : state;
    }
    default:
      return state;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const BASE = "https://t4e-testserver.onrender.com/api";
const PASSWORD = "130307";

/** Extract an array from any response shape */
function extractArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.activities)) return data.activities;
  if (Array.isArray(data.data))       return data.data;
  return null; // signal: no array found
}

/** Try one URL with given options; resolve to array or throw */
async function tryFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const arr = extractArray(data);
  if (!arr) throw new Error("No array in response");
  return arr;
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function ActivityProvider({ children }) {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });

    const headers = {
      "Content-Type": "application/json",
      password:        PASSWORD,
      Authorization:   PASSWORD,
      "x-password":    PASSWORD,
      "x-auth":        PASSWORD,
    };

    // Try multiple endpoint / auth strategies in sequence
    const attempts = [
      () => tryFetch(`${BASE}/b/activities?password=${PASSWORD}`          ),
      () => tryFetch(`${BASE}/b/activities`, { headers }                  ),
      () => tryFetch(`${BASE}/dataset/b/activities?password=${PASSWORD}`  ),
      () => tryFetch(`${BASE}/dataset/b?password=${PASSWORD}`             ),
      () => tryFetch(`${BASE}/dataset/b`,                    { headers }  ),
      () => tryFetch(`${BASE}/activities?password=${PASSWORD}`            ),
      () => tryFetch(`${BASE}/activities`,                   { headers }  ),
      // Fallback: try without /api in path
      () => tryFetch(`https://t4e-testserver.onrender.com/b/activities?password=${PASSWORD}` ),
    ];

    (async () => {
      let lastError = "";
      for (const attempt of attempts) {
        try {
          const arr = await attempt();
          dispatch({ type: "SET_ACTIVITIES", payload: arr });
          return; // success – stop trying
        } catch (err) {
          lastError = err.message;
          // try next
        }
      }
      
      // Fallback: use mock data when all API attempts fail
      console.warn("API failed, using mock data:", lastError);
      dispatch({ type: "SET_ACTIVITIES", payload: mockActivitiesData });
    })();
  }, []);

  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  );
}

// ── Custom hook ───────────────────────────────────────────────────────────────
export function useActivity() {
  return useContext(ActivityContext);
}

// ── Utility: normalise a raw activity object ──────────────────────────────────
// Field names from server may be all-lowercase; we normalise to camelCase.
export function normalise(a) {
  return {
    id:             a.activityid   ?? a.activityId   ?? a.id   ?? "",
    name:           a.name         ?? null,
    steps:          a.steps        ?? null,
    caloriesBurnt:  a.caloriesburnt ?? a.caloriesBurnt ?? null,
    workoutMinutes: a.workoutminutes ?? a.workoutMinutes ?? null,
    goalAchieved:   a.goalachieved  ?? a.goalAchieved  ?? null,
    date:           a.date          ?? null,
  };
}

// ── Utility: is a (normalised) activity valid? ────────────────────────────────
export function isValid(a) {
  const n = normalise(a);
  return (
    typeof n.steps          === "number" && n.steps          > 0 &&
    typeof n.caloriesBurnt  === "number" && n.caloriesBurnt  > 0 &&
    typeof n.workoutMinutes === "number" && n.workoutMinutes > 0 &&
    typeof n.goalAchieved   === "boolean"
  );
}
