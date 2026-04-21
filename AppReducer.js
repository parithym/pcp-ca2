const AppReducer = (state, action) => {
  switch (action.type) {

    case "SET_Tracker":
      return { ...state, : action.payload };

    case "ADD_ACTIVITIES":
      return { ...state, movies: [...state.movies, action.payload] };


    case "DELETE_VALUES":
      return {
        ...state,
        movies: state.movies.filter((m) => m.id !== action.payload),
      };


    case "TOGGLE_ACTIVITIES":
      return {
        ...state,
        movies: state.movies.map((m) =>
          m.id === action.payload ? { ...m, watched: !m.watched } : m
        ),
      };


    case "ADD_ACHIVED":
      return { ...state, favorites: [...state.favorites, action.payload] };


    case "REMOVE_ACHIVED":
      return {
        ...state,
        favorites: state.favorites.filter((m) => m.id !== action.payload),
      };

    default:
      return state;
  }
};

export default AppReducer;

