import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Meal from "./Meal";

function Meals() {
  const {loadedMeals, setLoadedMeals, isFetching} = useFetch("http://localhost:3000/meals");

  return (
    <ul id="meals">
      {isFetching && <p>Is Loading...</p>}
      {loadedMeals && loadedMeals.map(meal => (
        <Meal
          key={meal.id}
          meal={meal}
        />
      ))}
    </ul>
  );
}

export default Meals;
