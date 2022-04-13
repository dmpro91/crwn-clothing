import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  if (existingCartItem) {
    existingCartItem.quantity = existingCartItem.quantity + 1;
    return [...cartItems];
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  if (productToRemove.quantity > 1) {
    const existingCartItem = cartItems.find(
      (item) => item.id === productToRemove.id
    );

    existingCartItem.quantity = existingCartItem.quantity - 1;

    return [...cartItems];
  }

  return cartItems.filter(({ id }) => id !== productToRemove.id);
};

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter(({ id }) => id !== productToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  total: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

export const CART_ACTIONS_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReduser = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTIONS_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReduser`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, total }, dispatch] = useReducer(
    cartReduser,
    INITIAL_STATE
  );

  const updateCartItemsReduser = (newItems) => {
    const { cartCount, total } = newItems.reduce(
      (acc, item) => ({
        cartCount: acc.cartCount + item.quantity,
        total: item.price * item.quantity + acc.total,
      }),
      { cartCount: 0, total: 0 }
    );

    dispatch(
      createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, {
        cartItems: newItems,
        cartCount,
        total,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReduser(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);

    updateCartItemsReduser(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReduser(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    total,
  };

  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
