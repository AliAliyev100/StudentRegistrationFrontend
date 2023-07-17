import { useState, useContext, useCallback, useMemo } from "react";

import { userDataContext } from "../contexts/userDataContext";

export const useFetch = (url, options = {}) => {
  const { userToken } = useContext(userDataContext);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const memoizedOptions = useMemo(() => {
    return { ...options };
  }, [options]);
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
        ...options,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Request failed");
      } else {
        setData(responseData);
        setError(null);
      }
    } catch (catchedError) {
      setError(catchedError);
    } finally {
      setIsLoading(false);
    }
  }, [url, memoizedOptions]);

  return { data, error, isLoading, fetchData };
};
