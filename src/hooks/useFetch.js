import { useEffect, useState } from "react";

export default function useFetch(url){
    const [loadedMeals, setLoadedMeals] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchMeals() {
            setIsFetching(true);
            try{
              const response = await fetch(url);
              if (!response.ok) {
                setIsFetching(false);
                //bad response
              }
              const data = await response.json();
              setIsFetching(false);
              setLoadedMeals(data);
            } catch(error){
                setIsFetching(false);
              //error
            }
        }
        fetchMeals();
    }, []);
    
    return {loadedMeals, setLoadedMeals, isFetching}
}