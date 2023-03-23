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

const CartReducer = (state, { type, payload }) => {
  if (type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }

  if (type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((c) => c.id !== payload),
    };
  }

  if (type === INCREASE) {
    let tempCart = state.cart
      .map((cartItem) =>
        cartItem.id === payload ? { ...cartItem, amount: cartItem.amount + 1 } : cartItem
      );

    return {
      ...state,
      cart: tempCart,
    };
  }

  if (type === DECREASE) {
    const tempCart = state.cart
      .map((cartItem) =>
        cartItem.id === payload ? { ...cartItem, amount: cartItem.amount - 1 } : cartItem
      )
      .filter((cartItem) => cartItem.amount !== 0);

    return {
      ...state,
      cart: tempCart,
    };
  }

  if (type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));

    return {
      ...state,
      total,
      amount,
    };
  }

  if (type === LOADING) {
    return { ...state, loading: true };
  }

  if (type === DISPLAY_ITEMS) {
    return { ...state, cart: payload, loading: false };
  }

  if (type === TOGGLE_AMOUNT) {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === payload.id) {
        if (payload.type === 'inc') {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }

        if (payload.type === 'dec') {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
      }
      return cartItem;
    });

    tempCart = tempCart.filter((cartItem) => cartItem.amount !== 0);

    return { ...state, cart: tempCart };
  }

  if (type === OPEN_MODAL) {
    return {
      ...state,
      isOpen: true,
    };
  }

  if (type === CLOSE_MODAL) {
    return {
      ...state,
      isOpen: false,
    };
  }

  throw new Error('No matching action type');
};

export default CartReducer;
