import React from "react";
import { NavLink } from "react-router-dom";

export default function ErrorComponent(props) {
  const { error } = props;
  const errorMessages = [<h3 key="error">{error.toString()}!</h3>];
  return (
    <div>
      {errorMessages}
      <p>
        Go to the <NavLink to="/">Homepage</NavLink>.
      </p>
    </div>
  );
}
