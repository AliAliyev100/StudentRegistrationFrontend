import "./App.css";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { userDataContext } from "./contexts/userDataContext";

import Test from "./components/test";
import { NavLink } from "react-router-dom";
import Courses from "./pages/courses";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateCourse from "./pages/create-course";
import MyCourses from "./pages/my-courses";

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
  } = useContext(userDataContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="true"
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
              <li className="nav-item">
                <NavLink className="nav-link" to="pricing">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="courses">
                  All Courses
                </NavLink>
              </li>
              {userRole === "instructor" && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="my-courses">
                      My Courses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="create-course">
                      Create a Course
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {!isLoggedIn ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="login"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Join us
                  </NavLink>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <NavLink className="dropdown-item" to="login">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="register">
                        Register
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/courses" element={<Courses />} />
        {userRole === "instructor" && (
          <Route path="/create-course" element={<CreateCourse />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-courses" element={<MyCourses />} />
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
