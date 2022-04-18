import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTIONS_TYPES } from "./cart.types";

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

export const setIsCartOpen = (boolean) => createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);

    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);

    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};
