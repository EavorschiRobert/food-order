import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../context/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import { UserContext } from "../context/UserProgressContext";
import CartItem from "./CartItem";

function Cart() {
  const { items } = useContext(CartContext);
  const { progress, hideCart, showCheckout} = useContext(UserContext);

  const cartTotal = items ? items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity
  }, 0) : 0;

  const handleCloseCart = () => {
    hideCart();
  };
  const handleCheckout = () => {
    hideCart();
    showCheckout();
  }

  return (
    <Modal className="cart" open={progress === "cart"} onClose={progress === "cart" ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {items && items.map((item) => <CartItem key={item.id} item={item} />)}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items && items.length > 0 && (
          <Button onClick={handleCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
