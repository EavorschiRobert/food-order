import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../context/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import { UserContext } from "../context/UserProgressContext";

function Cart() {
  const { items } = useContext(CartContext);
  const {progress, showCart, hideCart} = useContext(UserContext);

  const cartTotal = items.reduce((totalAmount, item) => {
    return totalAmount + item.price * item.quantity;
  }, 0);

  const handleCloseCart = () => {
    hideCart();
  }

  return (
    <Modal className="cart" open={progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {items &&
          items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        <Button onClick={handleCloseCart}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}

export default Cart;
