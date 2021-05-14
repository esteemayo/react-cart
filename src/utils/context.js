import React, { useEffect, useContext, useReducer, createContext } from "react";

import cartItems from "./../services/dataService";
import reducer from "./reducer";

const apiEndpoint = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const handleIncrement = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  const handleDecrement = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(apiEndpoint);
    const cart = await res.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleClearCart,
        handleRemove,
        handleIncrement,
        handleDecrement,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
