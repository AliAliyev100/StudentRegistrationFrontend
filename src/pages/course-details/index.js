import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../contexts/userAuthContext";
import { useFetch } from "../../hooks/useFetch";
import ErrorComponent from "../../components/ErrorComponent";
import Loading from "../../components/loading";

import Menu from "./components/menu";

export const CourseDetails = () => {
  const {
    isLoggedIn,
    setUserToken,
    setUserId,
    setUsername,
    setUserRole,
    setIsLoggedIn,
    userRole,
    setExpiryDate,
  } = useAuth();

  const { courseId } = useParams();

  const url = "http://localhost:8000/courses/" + courseId;

  const { data, error, isLoading, fetchData } = useFetch(url, {});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  const handleTabChange = (selectedTabKey) => {
    console.log("Selected Tab Key:", selectedTabKey);
  };

  if (error) {
    return <ErrorComponent error={error} />;
  } else if (isLoading) {
    return <Loading />;
  }

  return <div>{<Menu onTabChange={handleTabChange} />}</div>;
};
