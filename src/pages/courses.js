import React, { useState, useEffect, useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import { ConfigProvider, Pagination } from "antd";

import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/loading";
import Course from "../components/course";

export default function Courses() {
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const baseURL = "http://localhost:8000/courses?page=";

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
}
