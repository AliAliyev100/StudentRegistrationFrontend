import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate, NavLink } from "react-router-dom";

import { userDataContext } from "../contexts/userDataContext";

import FormInput from "../components/formInput";
import { registerData } from "../data/registerData";

import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/loading";

import "../css/authForm.css";

export default function Register() {
  const {
    setUserToken,
    setUserId,
    setUsername,
    setUserRole,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(userDataContext);

  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    role: "Student",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const url = "http://localhost:8000/auth/register";

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...values,
    }),
  };
  const { data, error, isLoading, fetchData } = useFetch(url, options);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    if (data) {
      setUserToken(data.token);
      setUserId(data.userId);
      setUsername(data.username);
      setUserRole(data.userRole);
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [data]);

  const confirmPasswordPattern = `^${values.password.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  )}$`;

  const updatedRegisterData = registerData.map((input) =>
    input.name === "confirmPassword"
      ? { ...input, pattern: confirmPasswordPattern }
      : input
  );

  if (error) {
    return <ErrorComponent error={error} />;
  } else if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    navigate("/");
    return null;
  }

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit} autoComplete="off">
        <h1 className="formName">Register</h1>
        {updatedRegisterData.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            autoComplete="off"
          />
        ))}
        <button disabled={isLoading} className="auth-button">
          Submit
        </button>
        <NavLink className="dropdown-item messageUnderForm" to="/login">
          <h6 className="messageUnderForm">Already have an account?</h6>
        </NavLink>
      </form>
    </div>
  );
}
