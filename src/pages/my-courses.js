import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";

import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/loading";
import Course from "../components/course";

import { useAuth } from "../contexts/userAuthContext";

export const MyCourses = () => {
  const navigate = useNavigate();

  const { userId, isLoggedIn } = useAuth();
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const baseURL = `http://localhost:8000/instructor/courses?userId=${userId}&page=`;

  const { data, error, isLoading, fetchData } = useFetch(baseURL + page, {});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
      setPageCount(data.pageCount);
    }
  }, [data]);

  useEffect(() => {
    fetchData(baseURL + page);
  }, [page]);

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
    <div>
      <div className="course-list-container">
        {courses.map((course, index) => (
          <Course key={index} {...course} />
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          onChange={(e) => {
            setPage(e);
          }}
          defaultCurrent={page}
          total={pageCount * 10}
        />
      </div>
    </div>
  );
};
