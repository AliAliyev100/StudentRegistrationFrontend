import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/loading";
import Course from "../components/course";

import { userAuthContext } from "../contexts/userAuthContext";

export default function MyCourses() {
  const navigate = useNavigate();

  const { userId, isLoggedIn } = useContext(userAuthContext);
  const { page, setPage } = useState(1);
  const [courses, setCourses] = useState([]);

  const url = `http://localhost:8000/instructor/courses?userId=${userId}&page=${
    page || 1
  }`;

  const options = {};
  const { data, error, isLoading, fetchData } = useFetch(url, options);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
    }
  }, [data]);

  if (error) {
    return <ErrorComponent error={error} />;
  } else if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    navigate("/");
    return null;
  }

  return (
    <div className="course-list-container">
      {courses.map((course, index) => (
        <Course key={index} {...course} />
      ))}
    </div>
  );
}
