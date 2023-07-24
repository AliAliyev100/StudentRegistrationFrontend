import "./App.css";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import {
  Landing,
  Courses,
  Login,
  Register,
  CreateCourse,
  MyCourses,
  MyLearning,
  CourseDetails,
} from "./pages";

import Navbar from "./components/layout/navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/create-course" element={<CreateCourse />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
