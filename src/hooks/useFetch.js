import { useState,  useCallback, useMemo } from "react";
import { useAuth } from "../contexts/userAuthContext";
// import { userAuthContext } from "../contexts/userAuthContext";

export const useFetch = (url, options = {}) => {
  const { userToken } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const memoizedOptions = useMemo(() => {
    return { ...options };
  }, [options]);

  const fetchData = useCallback(
    async (fetchDataUrl) => {
      try {
        setIsLoading(true);
        const response = await fetch(fetchDataUrl || url, {
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
    },
    [url, memoizedOptions]
  );

  return { data, error, isLoading, fetchData };
};
