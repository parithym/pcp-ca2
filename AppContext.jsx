import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "../reducer/AppReducer";
import { getToken, getData } from "../services/api";

const initialState = {
  workouts: [],
  favorites: [],
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const data = await getData(token);
        dispatch({ type: "SET_WORKOUTS", payload: data });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
