import React, { useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate, NavLink } from "react-router-dom";

import FormInput from "../components/formInput";
import { loginData } from "../data/loginData";

import ErrorComponent from "../components/ErrorComponent";
import Loading from "../components/loading";

import { userAuthContext } from "../contexts/userAuthContext";

import "../css/authForm.css";

export const Login = () => {
  const {
    setUserToken,
    setUserId,
    setUsername,
    setUserRole,
    isLoggedIn,
    setIsLoggedIn,
    setExpiryDate,
  } = useContext(userAuthContext);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const url = "http://localhost:8000/auth/login";

  const options = {
    method: "POST",
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
      setExpiryDate(data.expiryDate);
      navigate("/");
    }
  }, [data]);

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
        <h1 className="formName">Login</h1>
        {loginData.map((input) => (
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
        <NavLink className="dropdown-item messageUnderForm" to="/register">
          <h6 className="messageUnderForm">Don't have an account yet?</h6>
        </NavLink>
      </form>
    </div>
  );
};
