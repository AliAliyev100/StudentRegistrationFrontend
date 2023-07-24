import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { userAuthContext } from "../../contexts/userAuthContext";

import "../../App.css";

export default function Navbar() {
  const {
    isLoggedIn,
    setUserToken,
    setUserId,
    setUsername,
    setUserRole,
    setIsLoggedIn,
    userRole,
    setExpiryDate,
  } = useContext(userAuthContext);

  function handleLogout() {
    setUserToken("");
    setUserId("");
    setUsername("");
    setUserRole("");
    setIsLoggedIn(false);
    setExpiryDate("");
  }

  const categories = [
    {
      name: "IT and Software Development",
      value: "IT and Software Development",
    },
    { name: "Personal Development", value: "Personal Development" },
    { name: "Music", value: "Music" },
    { name: "Finance and Marketing", value: "Finance and Marketing" },
    { name: "Health and Lifestyle", value: "Health and Lifestyle" },
    { name: "Design", value: "Design" },
    { name: "Teaching and Academics", value: "Teaching and Academics" },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg bg-light shadow p-3 bg-white rounded"
      data-bs-theme="light"
    >
      <NavLink className="navbar-brand logo" to="/"></NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <button
              className="btn  dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </button>
            <ul className="dropdown-menu  autoClose">
              {categories.map((action, index) => (
                <li key={index}>
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to={`/courses/category/${action.value
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                  >
                    {action.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/courses">
              All Courses
            </NavLink>
          </li>
          {userRole === "instructor" && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/my-courses">
                  My Courses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create-course">
                  Create a Course
                </NavLink>
              </li>
            </>
          )}
          {userRole === "student" && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/my-learning">
                  My Learning
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <form className="d-flex ms-auto">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
        <div className="navbar-nav ms-auto auth-elements">
          {!isLoggedIn ? (
            <>
              <NavLink className="nav-link" to="/login">
                Log In
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Sign Up
              </NavLink>
            </>
          ) : (
            <button className="nav-link" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
