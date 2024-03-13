import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Meals() {
  const [addItem, setAddItem] = useState({
    id: "",
    display: false,
  });

  const notify = (item) => {
    toast.success(`${item.name} Added to Cart!`, {
      position: "top-left",
      theme: "colored",
      pauseOnFocusLoss: false
    });
  };
  const [meals, setMeals] = useState();
  const { cartItems, handleAdd } = useContext(CartContext);
  useEffect(() => {
    async function fetchMeals() {
      const meals = await fetch("http://localhost:3000/meals");
      const data = await meals.json();
      setMeals(data);
    }
    fetchMeals();
  }, []);
  return (
    <div className="products">
      <ToastContainer autoClose={2000}/>
      <div id="meals">
        {meals &&
          meals.map((item) => {
            return (
              <div key={item.id} className="meal-item">
                <img src={`http://localhost:3000/${item.image}`} />
                <article>
                  <h3>{item.name}</h3>
                </article>
                <div className="item-description">
                  <p className="meal-item-price">${item.price}</p>
                  <p className="meal-item-description">{item.description}</p>
                  <button
                    onClick={() => {
                      handleAdd(item.name, item.id, item.price);
                      notify(item);
                    }}
                  >
                    Add to Cart
                  </button>
                  {addItem && addItem.display && addItem.id === item.id && (
                    <p className="added">Item Added to Cart!</p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Meals;
