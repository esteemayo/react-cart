import { useEffect, useContext, useReducer, createContext } from 'react';

import {
  CLEAR_CART,
  CLOSE_MODAL,
  DECREASE,
  DISPLAY_ITEMS,
  GET_TOTALS,
  INCREASE,
  LOADING,
  OPEN_MODAL,
  REMOVE,
  TOGGLE_AMOUNT,
} from './CartTypes';
import cartItems from 'services/dataService';
import CartReducer from './CartReducer';

const apiEndpoint = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  loading: false,
  isOpen: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const handleClearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });
  };

  const handleRemove = (id) => {
    dispatch({
      type: REMOVE,
      payload: id,
    });
  };

  const handleIncrement = (id) => {
    dispatch({
      type: INCREASE,
      payload: id,
    });
  };

  const handleDecrement = (id) => {
    dispatch({
      type: DECREASE,
      payload: id,
    });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const res = await fetch(apiEndpoint);
    const cart = await res.json();
    dispatch({
      type: DISPLAY_ITEMS,
      payload: cart,
    });
  };

  const toggleAmount = (id, type) => {
    dispatch({
      type: TOGGLE_AMOUNT,
      payload: {
        id,
        type,
      },
    });
  };

  const openModal = () => {
    dispatch({
      type: OPEN_MODAL,
    });
  };

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({
      type: GET_TOTALS,
    });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        handleClearCart,
        handleRemove,
        handleIncrement,
        handleDecrement,
        toggleAmount,
        openModal,
        closeModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(CartContext);
};

export { CartProvider };
