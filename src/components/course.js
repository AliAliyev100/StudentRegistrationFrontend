import React, { useContext, useEffect, useState, useRef } from "react";
import { useFetch } from "../hooks/useFetch";
import { userAuthContext } from "../contexts/userAuthContext";

import "../css/courses.css";

const Course = ({
  name,
  description,
  imagepath,
  numberOfParticipants,
  limit,
  status,
  startDate,
  endDate,
  _id,
}) => {
  const path = ("http://localhost:8000/" + imagepath).replace(/\\/g, "/");
  const formattedStartDate = startDate.slice(0, 10).replace(/-/g, "/");
  const formattedEndDate = endDate.slice(0, 10).replace(/-/g, "/");

  const [participants, setParticipants] = useState(numberOfParticipants);
  const [courseJoinable, setCourseJoinable] = useState(
    numberOfParticipants < limit
  );

  const { userId, isLoggedIn } = useContext(userAuthContext);

  const options = {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      courseId: _id,
    }),
  };

  const url = `http://localhost:8000/courses/joincourse`;
  const { data, error, isLoading, fetchData } = useFetch(url, options);

  const closeButtonRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
    fetchData();
  };

  useEffect(() => {
    if (data) {
      setParticipants(data.numberOfParticipants);
      setCourseJoinable(data.numberOfParticipants < limit);
    }
  }, [data]);

  return (
    <div className="card course-card">
      <img src={path} className="card-img-top course-card-img " alt={name} />
      <div className="card-body">
        <h5 className="card-title fw-bold">{name}</h5>
        <p className="card-text">{description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-center">
          Users: {participants}/{limit}
        </li>
        <li className="list-group-item d-flex justify-content-center">
          {formattedStartDate} - {formattedEndDate}
        </li>
        <li className="list-group-item d-flex justify-content-center">
          Status: {capitalize(status)}
        </li>
      </ul>
      <div className="card-body d-flex justify-content-center">
        <button type="button" className="card-link btn btn-primary">
          Course Details
        </button>
        {isLoggedIn && courseJoinable && (
          <button
            className="card-link btn btn-success"
            data-bs-toggle="modal"
            data-bs-target={`#exampleModal_${_id}`}
          >
            Join Course
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
                onClick={handleSubmit}
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
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export default Course;
