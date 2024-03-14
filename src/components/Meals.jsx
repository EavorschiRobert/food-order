import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Meal from "./Meal";
import Error from "./Error";

function Meals() {
  const {data: loadedMeals, isFetching, error} = useFetch("http://localhost:3000/meals");


  return (
    <ul id="meals">
      {isFetching && <p className="center">Is Loading...</p>}
      {loadedMeals && loadedMeals.map && loadedMeals.map(meal => (
        <Meal
          key={meal.id}
          meal={meal}
        />
      ))}
      {error && <Error title='Failed to Fetch Meals' message={error.message}/>}
    </ul>
  );
}

export default Meals;
