import { createContext, useState, useEffect } from "react";

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
  total: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce((total, item) => (item.price * item.quantity) + total , 0);
    setTotal(newTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemFromCart = (productToRemove) =>
    setCartItems(removeCartItem(cartItems, productToRemove));

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    total
  };

  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
