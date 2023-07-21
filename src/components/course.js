import React, { useContext, useEffect, useState, useRef } from "react";
import { useFetch } from "../hooks/useFetch";
import { userAuthContext } from "../contexts/userAuthContext";
import { useNavigate } from "react-router-dom";

import "../css/courses.css";

const Course = ({
  name,
  description,
  imagepath,
  students,
  limit,
  status,
  startDate,
  endDate,
  _id,
}) => {
  const navigate = useNavigate();

  const path = ("http://localhost:8000/" + imagepath).replace(/\\/g, "/");
  const formattedStartDate = startDate.slice(0, 10).replace(/-/g, "/");
  const formattedEndDate = endDate.slice(0, 10).replace(/-/g, "/");

  const [participants, setParticipants] = useState(students.length);
  const [courseJoinable, setCourseJoinable] = useState(
    students.length < limit && status === "registrtation_open"
  );

  const { userId, isLoggedIn, userRole } = useContext(userAuthContext);

  const [isJoined, setIsJoined] = useState(
    students.some((studentId) => studentId === userId)
  );

  const isInstructor = userRole.toLowerCase() === "instructor";

  const options = {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      courseId: _id,
    }),
  };

  const joinUrl = `http://localhost:8000/courses/joincourse`;
  const exitUrl = `http://localhost:8000/courses/exitcourse`;
  const { data, error, isLoading, fetchData } = useFetch(joinUrl, options);

  const closeButtonRef = useRef();

  const handleJoinCourse = (e) => {
    e.preventDefault();
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
    fetchData();
  };

  const handleExitCourse = (e) => {
    e.preventDefault();
    fetchData(exitUrl);
  };

  const handleCourseDetails = () => {
    const courseDetailsUrl = `/courses/${_id}`;
    navigate(courseDetailsUrl);
  };

  useEffect(() => {
    if (data) {
      setParticipants(data.numberOfParticipants);
      setCourseJoinable(
        data.numberOfParticipants < limit && status === "registrtation_open"
      );
      if (data.exitted) {
        setIsJoined(false);
      } else if (data.joined) {
        setIsJoined(true);
      }
    }
  }, [data]);

  return (
    <div className="card course-card">
      <img src={path} className="card-img-top course-card-img " alt={name} />
      <div className="card-body">
        <h5 className="card-title fw-bold ">{name}</h5>
        {/* <p className="card-text">{description}</p> */}
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-center card-text">
          Users: {participants}/{limit}
        </li>
        <li className="list-group-item d-flex justify-content-center card-text">
          {formattedStartDate} - {formattedEndDate}
        </li>
        <li className="list-group-item d-flex justify-content-center card-text">
          Status: {capitalize(status)}
        </li>
      </ul>
      <div className="card-body d-flex justify-content-center">
        <button
          type="button"
          className="card-link btn btn-primary"
          onClick={handleCourseDetails}
        >
          Course Details
        </button>
        {isLoggedIn && courseJoinable && !isInstructor && !isJoined && (
          <button
            className="card-link btn btn-success"
            data-bs-toggle="modal"
            data-bs-target={`#exampleModal_${_id}`}
          >
            Join Course
          </button>
        )}
        {isJoined && (
          <button
            className="card-link btn btn-danger"
            onClick={handleExitCourse}
          >
            Exit Course
          </button>
        )}
      </div>
      <div // modal
        className="modal fade"
        id={`exampleModal_${_id}`}
        tabIndex="-1"
        aria-labelledby={`exampleModalLabel_${_id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`exampleModalLabel_${_id}`}>
                Join Course
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to join the course{" "}
              <h5 className="fw-bold">{name}?</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                ref={closeButtonRef}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleJoinCourse}
              >
                Join Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function capitalize(word) {
  return (
    word[0].toUpperCase() + word.substring(1).toLowerCase().replace("_", " is ")
  );
}

export default Course;
