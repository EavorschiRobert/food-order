import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Input from "./Input";

function Checkout({ totalAmount }) {
  const { showModalCheck, handleModalCheck } = useContext(CartContext);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });

  const emailValid = fields.email.length > 0 && fields.email.includes("@");

  const handleChangeField = (item, type) => {
    setEmailIsInvalid(false)
    setFields((prevState) => ({
      ...prevState,
      [type]: item,
    }));
  };
  const handleBlur = () => {
    if (!fields.email.length > 0 || !fields.email.includes("@")) {
      setEmailIsInvalid(true);
    } else {
      setEmailIsInvalid(false);
    }
  };

  return (
    <dialog open={showModalCheck} className="modal">
      <h2>Checkout</h2>
      <p>Total Amount: ${totalAmount}</p>
      <form>
        <Input
          label="Full Name"
          id="name"
          type="text"
          value={fields.name}
          handleChange={handleChangeField}
          required
        />
         <span className="form-city" id="validation-field">
          <Input
            label="E-Mail Address"
            id="email"
            type="email"
            value={fields.email}
            handleChange={handleChangeField}
            onBlur={handleBlur}
          />
          {emailIsInvalid && <p className="validation">Email is Invalid</p>}
        </span>

        <Input
          label="Street"
          id="street"
          type="text"
          value={fields.street}
          handleChange={handleChangeField}
          required
        />
        <span className="form-city">
          <Input
            label="Postal Code"
            id="postal"
            type="text"
            value={fields.postalCode}
            handleChange={handleChangeField}
            required
          />
          <Input
            label="City"
            id="city"
            type="text"
            value={fields.city}
            handleChange={handleChangeField}
            required
          />
        </span>
      </form>
      <div className="buttons">
        <button style={{ background: "none" }} onClick={handleModalCheck}>
          Close
        </button>
        <button
          onClick={() => {
            handleModal();
          }}
        >
          Submit Order
        </button>
      </div>
    </dialog>
  );
}

export default Checkout;
