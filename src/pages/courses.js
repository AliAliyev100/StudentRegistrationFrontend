import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Pagination } from "antd";
import { useParams, useNavigate } from "react-router-dom";

import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/loading";
import Course from "../components/course";

export const Courses = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const baseURL = !categoryName
    ? "http://localhost:8000/courses?page="
    : `http://localhost:8000/courses/category/${categoryName}?page=`;

  const { data, error, isLoading, fetchData } = useFetch(baseURL + page, {});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [categoryName]);

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
      setPageCount(data.pageCount);
    }
  }, [data]);

  useEffect(() => {
    fetchData(baseURL + page);
    if (categoryName) {
      navigate(`/courses/category/${categoryName}?page=${page}`);
    } else {
      navigate(`/courses/?page=${page}`);
    }
  }, [categoryName, page]);

  if (error) {
    return <ErrorComponent error={error} />;
  } else if (isLoading) {
    return <Loading />;
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
