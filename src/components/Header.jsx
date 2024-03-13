import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../context/CartContext";
function Header() {
  const {items} = useContext(CartContext);

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>Food Shop</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
