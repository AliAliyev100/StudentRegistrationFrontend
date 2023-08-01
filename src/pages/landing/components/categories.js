import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/userAuthContext";

import "../../../App.css";

export const Categories = () => {
  const { isLoggedIn } = useAuth();

  const baseImageUrl = "http://localhost:8000/Images/category-images/";

  const categories = [
    {
      name: "IT & Software Development",
      value: "IT and Software Development",
      imageUrl: "",
    },
    {
      name: "Personal Development",
      value: "Personal Development",
      imageUrl: "",
    },
    { name: "Music", value: "Music", imageUrl: "" },
    {
      name: "Finance & Marketing",
      value: "Finance and Marketing",
      imageUrl: "",
    },
    {
      name: "Health & Lifestyle",
      value: "Health and Lifestyle",
      imageUrl: "",
    },
    { name: "Design", value: "Design", imageUrl: "" },
    {
      name: "Teaching & Academics",
      value: "Teaching and Academics",
      imageUrl: "",
    },
    { name: "Photography", value: "Photography", imageUrl: "" },
  ];

  const listStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(275px, 1fr))",
    gap: "2rem",
    justifyContent: "center",
    margin: "0 auto",
    maxWidth: "1200px",
    marginTop: "2rem",
    marginBottom: "6rem",
  };

  const categoryStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: "275px",
  };

  const imageStyle = {
    width: "225px",
    height: "225px",
  };

  const imageTextStyle = {
    fontWeight: "bold",
    fontFamily: "monospace",
    marginTop: "1rem",
  };

  const headerStyle = {
    // textAlign: "center",
    maxWidth: "1200px",
    fontWeight: "bold",
    fontFamily: "monospace",
    margin: "5rem auto 0",
  };

  return (
    <div>
      <h1 style={headerStyle}>Categories</h1>
      <div style={listStyle}>
        {categories.map((category, index) => (
          <div>
            <div style={categoryStyle} key={index}>
              <NavLink
                to={`/courses/category/${normalizeCategoryValue(
                  category.value
                )}`}
              >
                <img
                  src={
                    baseImageUrl +
                    normalizeCategoryValue(category.value) +
                    ".png"
                  }
                  alt={category.name}
                  style={imageStyle}
                  className="category-image"
                />
              </NavLink>
            </div>
            <h5 style={imageTextStyle}>{category.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );

  function normalizeCategoryValue(value) {
    return value.toLowerCase().replace(/ /g, "-");
  }
};
