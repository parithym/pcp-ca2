const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { ...state, workouts: action.payload };
    case "ADD_WORKOUT":
      return { ...state, workouts: [...state.workouts, action.payload] };
    case "DELETE_WORKOUT":
      return { ...state, workouts: state.workouts.filter((w) => w.id !== action.payload) };
    case "TOGGLE_COMPLETED":
      return {
        ...state,
        workouts: state.workouts.map((w) =>
          w.id === action.payload ? { ...w, completed: !w.completed } : w
        ),
      };
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return { ...state, favorites: state.favorites.filter((w) => w.id !== action.payload) };
    default:
      return state;
  }
};

export default AppReducer;
