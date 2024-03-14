import React, { useContext, useState } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../context/CartContext";
import { currencyFormatter } from "../utils/formatting";
import { UserContext } from "../context/UserProgressContext";
import Input from "./Input";
import Button from "./UI/Button";
import useFetch from "../hooks/useFetch";

function Checkout() {
  const { items } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserContext);
  const {data, isFetching, error, fetchData} = useFetch('http://localhost:3000/orders', 'POST');
  const [fields, setFields] = useState({
    name: "",
    email: "",
    street: "",
    'postal-code': "",
    city: "",
  });

  const cartTotal = items.reduce((totalAmount, item) => {
    return totalAmount + item.price * item.quantity;
  }, 0);

  const handleClose = () => {
    hideCheckout();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
      method: "POST",
      body: JSON.stringify({
        order: {
          items: items,
          customer: fields
        }
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetchData(config).then(response => console.log(response));
    
  };
  const handleChange = (value, type) => {
    setFields((prevState) => {
      return {
        ...prevState,
        [type]: value,
      };
    });
  };
  return (
    <Modal open={progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input
          label="Full Name"
          id="full-name"
          type="text"
          value={fields.fullName}
          onChange={(e) => handleChange(e.target.value, "name")}
        />
        <Input
          label="E-mail Address"
          id="email"
          type="email"
          value={fields.email}
          onChange={(e) => handleChange(e.target.value, "email")}
        />
        <Input
          label="Street"
          type="text"
          id="street"
          value={fields.street}
          onChange={(e) => handleChange(e.target.value, "street")}
        />
        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postal-code"
            value={fields.postalCode}
            onChange={(e) => handleChange(e.target.value, "postal-code")}
          />
          <Input
            label="City"
            type="text"
            id="city"
            value={fields.city}
            onChange={(e) => handleChange(e.target.value, "city")}
          />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
