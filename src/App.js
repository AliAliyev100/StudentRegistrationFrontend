import "./App.css";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { userAuthContext } from "./contexts/userAuthContext";

import Test from "./components/test";
import { NavLink } from "react-router-dom";
import Courses from "./pages/courses";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateCourse from "./pages/create-course";
import MyCourses from "./pages/my-courses";
import CourseDetails from "./pages/CourseDetails";

import "./App.css";
import Categories from "./pages/categories";

function App() {
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

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
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
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{ backgroundColor: "transparent" }}
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{ backgroundColor: "transparent" }}
                  >
                    Another action
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{ backgroundColor: "transparent" }}
                  >
                    Something else here
                  </a>
                </li>
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

      <Routes>
        <Route path="/" element={<Test />} />

        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/create-course" element={<CreateCourse />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );

  function handleLogout() {
    setUserToken("");
    setUserId("");
    setUsername("");
    setUserRole("");
    setIsLoggedIn(false);
    setExpiryDate("");
  }
}

export default App;
