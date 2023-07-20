import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { userAuthContext } from "../contexts/userAuthContext";
import { useFetch } from "../hooks/useFetch";
import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/loading";

export default function CourseDetails() {
  const {
    isLoggedIn,
    setUserToken,
    setUserId,
    setUsername,
    setUserRole,
    setIsLoggedIn,
    userRole,
    setExpiryDate,
  } = useContext(userAuthContext);

  const { courseId } = useParams();

  const url = "http://localhost:8000/courses/" + courseId;

  const { data, error, isLoading, fetchData } = useFetch(url, {});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) {
    return <ErrorComponent error={error} />;
  } else if (isLoading) {
    return <Loading />;
  }

  return <div>CourseDetails</div>;
}
