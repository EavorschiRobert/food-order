import React, { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import { CartContext } from "../context/CartContext";

function Meal({ meal }) {
    const {items, addItem} = useContext(CartContext);

    const handleAdd = (item) => {
        addItem(item);
    }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
          <p className="meal-item-actions">
            <Button onClick={() => handleAdd(meal)}>Add to Cart</Button>
          </p>
        </div>
      </article>
    </li>
  );
}

export default Meal;
