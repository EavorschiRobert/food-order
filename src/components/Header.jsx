import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserProgressContext";
function Header() {
  const {items} = useContext(CartContext);
  const {showCart} = useContext(UserContext)
  
  const totalCartItems = items ? items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity
  }, 0) : 0;

  const handleShowCart = () => {
    showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>Food Shop</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
