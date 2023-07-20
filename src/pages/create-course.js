import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate, NavLink } from "react-router-dom";

import FormInput from "../components/formInput";
import { createCourseData } from "../data/createCourseData";

import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/loading";

import { userAuthContext } from "../contexts/userAuthContext";

import "../css/authForm.css";

export default function CreateCourse() {
  const { userToken, isLoggedIn } = useContext(userAuthContext);

  const [values, setValues] = useState({
    name: "",
    description: "",
    startdate: Date(),
    enddate: Date(),
    participitantLimit: 0,
    category: "",
  });

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setFile(file);
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const url = "http://localhost:8000/instructor/create-course";

  const [options, setOptions] = useState({
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
    },
    body: null,
  });

  useEffect(() => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("startdate", values.startdate);
    formData.append("enddate", values.enddate);
    formData.append("participitantLimit", values.participitantLimit);
    formData.append("category", values.category);
    formData.append("image", file);

    setOptions((prevOptions) => ({
      ...prevOptions,
      body: formData,
    }));
  }, [JSON.stringify(values), file]);

  const { data, error, isLoading, fetchData } = useFetch(url, options);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    if (data) {
      navigate("/my-courses");
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
    <div className="create-course-form">
      <form onSubmit={handleSubmit} autoComplete="off">
        <h1 className="formName">Create Course</h1>
        {createCourseData.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            autoComplete="off"
          />
        ))}
        <div>
          <label>{"Description"}</label>
          <textarea
            id="description"
            name="description"
            placeholder="Course Description"
            pattern="^.{20,500}$"
            required
            style={{
              width: "100%",
              borderRadius: "0.3rem",
              height: "5rem",
            }}
            onChange={onChange}
            key={9}
          />
        </div>
        <button disabled={isLoading} className="create-course-button">
          Create
        </button>
      </form>
    </div>
  );
}
