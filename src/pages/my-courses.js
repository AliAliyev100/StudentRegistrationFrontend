import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate, NavLink } from "react-router-dom";

import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/loading";

import { userAuthContext } from "../contexts/userAuthContext";

import "../css/authForm.css";

export default function CreateCourse() {
  const navigate = useNavigate();

  const { userId, isLoggedIn } = useContext(userAuthContext);
  const { page, setPage } = useState(1);

  const url = "http://localhost:8000/instructor/courses?" + userId + "?" + page;

  const options = {};
  const { data, error, isLoading, fetchData } = useFetch(url, options);

  fetchData();

  if (error) {
    return <ErrorComponent error={error} />;
  } else if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    navigate("/");
    return null;
  }

  return <div className="course-list"></div>;
}
