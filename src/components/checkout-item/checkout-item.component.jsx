import { useDispatch, useSelector } from "react-redux";

import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
  const { name, quantity, imageUrl, price } = item;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addItemHeandler = () => dispatch(addItemToCart(cartItems, item));
  const removeItemHeandler = () => dispatch(removeItemFromCart(cartItems,item));
  const clearItemHeandler = () => dispatch(clearItemFromCart(cartItems, item));

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
