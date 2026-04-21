import { createContext, useContext, useReducer } from "react";
import { ordersData } from "../data/orders";

// ── Initial State ──────────────────────────────────────────────────────────────
const initialState = {
  orders: ordersData,
  filterStatus: "all",
  filterCategory: "all",
  searchQuery: "",
};

// ── Reducer ────────────────────────────────────────────────────────────────────
function orderReducer(state, action) {
  switch (action.type) {
    case "SET_FILTER_STATUS":
      return { ...state, filterStatus: action.payload };
    case "SET_FILTER_CATEGORY":
      return { ...state, filterCategory: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "RESET_FILTERS":
      return { ...state, filterStatus: "all", filterCategory: "all", searchQuery: "" };
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────────────────────
const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Derived values computed (not stored in state)
  const filteredOrders = state.orders
    .filter((o) => state.filterStatus === "all" || o.status === state.filterStatus)
    .filter((o) => state.filterCategory === "all" || o.category === state.filterCategory)
    .filter((o) =>
      state.searchQuery === "" ||
      o.customer.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      o.product.toLowerCase().includes(state.searchQuery.toLowerCase())
    );

  const totalOrders = state.orders.length;
  const deliveredOrders = state.orders.filter((o) => o.status === "delivered").length;
  const cancelledOrders = state.orders.filter((o) => o.status === "cancelled").length;
  const pendingOrders = state.orders.filter((o) => o.status === "pending").length;

  const categories = [...new Set(state.orders.map((o) => o.category))];

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        filteredOrders,
        totalOrders,
        deliveredOrders,
        cancelledOrders,
        pendingOrders,
        categories,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
