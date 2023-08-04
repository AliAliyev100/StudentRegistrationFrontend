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
      key: 1,
    },
    {
      name: "Personal Development",
      value: "Personal Development",
      imageUrl: "",
      key: 2,
    },
    { name: "Music", value: "Music", imageUrl: "", key: 3 },
    {
      name: "Finance & Marketing",
      value: "Finance and Marketing",
      imageUrl: "",
      key: 4,
    },
    {
      name: "Health & Lifestyle",
      value: "Health and Lifestyle",
      imageUrl: "",
      key: 5,
    },
    { name: "Design", value: "Design", imageUrl: "", key: 6 },
    {
      name: "Teaching & Academics",
      value: "Teaching and Academics",
      imageUrl: "",
      key: 7,
    },
    { name: "Photography", value: "Photography", imageUrl: "", key: 8 },
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
          <div key={category.key}>
            <div style={categoryStyle}>
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
            <h5 style={imageTextStyle}>
              {category.name} {index}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );

  function normalizeCategoryValue(value) {
    return value.toLowerCase().replace(/ /g, "-");
  }
};
