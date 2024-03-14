import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    
    const controller = new AbortController();

    async function fetchMeals() {
      setIsFetching(true);
      try {
        const response = await fetch(url, {signal: controller.signal});
        if (!response.ok) {
          setIsFetching(false);
          setError("Error: Could Not Fetch Data");
        }
        const data = await response.json();
        setIsFetching(false);
        setLoadedMeals(data);
      } catch (error) {
        setIsFetching(false);
        setError(error);
      }
    }
    fetchMeals();
    return () => {
      controller.abort();
    }
  }, []);

  return { loadedMeals, setLoadedMeals, isFetching, error };
}
