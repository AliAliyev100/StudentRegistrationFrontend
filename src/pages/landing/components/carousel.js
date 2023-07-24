import { Carousel } from "antd";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../../contexts/userAuthContext";

import "../../../App.css";
import "../../../css/carousel.css";

export const CustomCarousel = () => {
  const contentStyle1 = {
    backgroundImage:
      "url(https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg?w=1380&t=st=1690064839~exp=1690065439~hmac=fd6468d9e65479c6665b11705a8118ce622470c02dce70e9aa6655b1cac7ec05)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    height: "40vh",
  };

  const contentStyle2 = {
    backgroundImage:
      "url(https://www.czechuniversities.com/uploads/2023/05/smiling-male-student-working-studying-library-kopie.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    height: "40vh",
  };

  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Carousel
        autoplay
        effect="fade"
        style={{
          margin: "0 auto",
          maxWidth: "1200px",
          boxShadow: "0 4px 20px gray",
        }}
      >
        <div>
          <div style={contentStyle1}>
            {isLoggedIn ? (
              <div className="carousel-content">
                <h3>
                  Continue learning to Enhance
                  <br /> Your Skills!
                </h3>
                <NavLink className="nav-link" to="/my-learning">
                  <button className="btn btn-dark">My Learning</button>
                </NavLink>
              </div>
            ) : (
              <div className="carousel-content">
                <h3>
                  Join the Community to Enhance
                  <br /> Your Skills!
                </h3>
                <NavLink className="nav-link" to="/register">
                  <button className="btn btn-dark">Sign Up</button>
                </NavLink>
              </div>
            )}
          </div>
          {isLoggedIn ? (
            <div className="carousel-content-below">
              <h3>
                Continue learning to Enhance
                <br /> Your Skills!
              </h3>
              <NavLink className="nav-link" to="/my-learning">
                <button className="btn btn-dark">My Learning</button>
              </NavLink>
            </div>
          ) : (
            <div className="carousel-content-below">
              <h3>
                Join the Community to Enhance
                <br /> Your Skills!
              </h3>
              <NavLink className="nav-link" to="/register">
                <button className="btn btn-dark">Sign Up</button>
              </NavLink>
            </div>
          )}
        </div>
        <div>
          <div style={contentStyle2}>
            <div className="carousel-content">
              <h3>
                Embark on Your Learning
                <br />
                Journey Today!
              </h3>
              <NavLink className="nav-link" to="/courses">
                <button className="btn btn-dark">Courses</button>
              </NavLink>
            </div>
          </div>
          <div className="carousel-content-below">
            <h3>Embark on Your Learning Journey Today!</h3>
            <NavLink className="nav-link" to="/register">
              <button className="btn btn-dark">Courses</button>
            </NavLink>
          </div>
        </div>
      </Carousel>
    </div>
  );
};
