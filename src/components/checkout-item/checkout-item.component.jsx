import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
  const { name, quantity, imageUrl, price } = item;
  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const addItemHeandler = () => addItemToCart(item);
  const removeItemHeandler = () => removeItemFromCart(item);
  const clearItemHeandler = () => clearItemFromCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <div className="arrow" onClick={removeItemHeandler}> &#10094; </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHeandler}> &#10095; </div>
      </div>
      <div className="price">{price}</div>
      <div className="remove-button" onClick={clearItemHeandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
