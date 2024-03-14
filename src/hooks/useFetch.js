import { useEffect, useState } from "react";

export default function useFetch(url, config) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();


  const controller = new AbortController();

  async function fetchData(configuration) {
    setIsFetching(true);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        ...configuration,
      });
      if (!response.ok) {
        setIsFetching(false);
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setIsFetching(false);
      setData(data);
    } catch (error) {
      setIsFetching(false);
      setError(error);
    }
  }

  useEffect(() => {
    if (!config) {
      fetchData();
    }
  }, [config]);

  return { data, isFetching, error, fetchData };
}
