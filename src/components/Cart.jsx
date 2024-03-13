import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Checkout from "./Checkout";

function Cart() {
  const {
    cartItems,
    showModal,
    handleModal,
    handleAdd,
    handleRemove,
    handleModalCheck,
  } = useContext(CartContext);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    const arrayItems = Object.values(cartItems);
    let amount = 0;
    for (const item of arrayItems) {
      amount = amount + +item.price * item.qt;
    }
    setTotalCart(amount);
  }, [cartItems]);

  const items = Object.entries(cartItems);

  return (
    <>
      <Checkout totalAmount={totalCart} />
      <dialog
        open={showModal}
        className={`modal ${showModal && " cart-modal"}`}
      >
        <div>
          <h2>Your Cart</h2>
          <ul>
            {items &&
              items.map((item) => {
                if(item[1].qt > 0){
                  return (
                    <li key={item[1].id} className="cart-item">
                      <div>
                        {item[0]} - {item[1].qt} x ${item[1].price}
                      </div>
                      <div className="item-quantity">
                        <button className="cart-button"
                          onClick={() =>
                            handleRemove(item[0], item[1].id, item[1].price)
                          }
                        >
                          -
                        </button>
                        <p>{item[1].qt}</p>
                        <button className="cart-button"
                          onClick={() =>
                            handleAdd(item[0], item[1].id, item[1].price)
                          }
                        >
                          +
                        </button>
                      </div>
                    </li>
                  );
                }
                
              })}
            {totalCart > 0 && <p className="total">$ {totalCart}</p>}
          </ul>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={{ background: "none" }} onClick={handleModal} className="cart-button">
            Close
          </button>
          <button className="cart-button"
            onClick={() => {
              handleModal();
              handleModalCheck();
            }}
          >
            Submit Order
          </button>
        </div>
      </dialog>
    </>
  );
}

export default Cart;
