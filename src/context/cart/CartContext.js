import { useEffect, useContext, useReducer, createContext } from 'react';

import * as types from './CartTypes';
import cartItems from 'data';
import CartReducer from './CartReducer';

const apiUrl = 'https://course-api.com/react-useReducer-cart-project';

const INITIAL_STATE = {
  loading: false,
  isOpen: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);

  const handleClearCart = () => {
    dispatch({
      type: types.CLEAR_CART,
    });
  };

  const handleRemove = (id) => {
    dispatch({
      type: types.REMOVE,
      payload: id,
    });
  };

  const handleIncrement = (id) => {
    dispatch({
      type: types.INCREASE,
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
    const res = await fetch(apiUrl);
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

export default CartProvider;
