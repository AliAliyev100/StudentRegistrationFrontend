import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";

import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/loading";
import Course from "../components/course";

export default function Courses() {
  const { page, setPage } = useState(1);
  const [courses, setCourses] = useState([]);

  const url = `http://localhost:8000/courses?page=${page || 1}`;

  const { data, error, isLoading, fetchData } = useFetch(url, {});

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

  return (
    <div className="course-list-container">
      {courses.map((course, index) => (
        <Course key={index} {...course} />
      ))}
    </div>
  );
}
