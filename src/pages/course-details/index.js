import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../contexts/userAuthContext";
import { useFetch } from "../../hooks/useFetch";
import ErrorComponent from "../../components/ErrorComponent";
import Loading from "../../components/loading";

import MenuComponent from "./components/menu";
import MobileTab from "./components/mobileTab";
import Home from "./components/home";
import Announcements from "./components/announcements";

import { Layout } from "antd";

const { Content, Sider } = Layout;

export const CourseDetails = () => {
  // const {
  //   isLoggedIn,
  //   setUserToken,
  //   setUserId,
  //   setUsername,
  //   setUserRole,
  //   setIsLoggedIn,
  //   userRole,
  //   setExpiryDate,
  // } = useAuth();

  const { courseId } = useParams();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const url = "http://localhost:8000/courses/" + courseId;

  const { data, error, isLoading, fetchData } = useFetch(url, {});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [data]);

  const [tab, setTab] = useState(<Home />);
  const handleTabChange = (selectedTabKey) => {
    switch (selectedTabKey) {
      case "1":
        setTab(<Home />);
        break;
      case "3":
        setTab(<Announcements />);
        break;
    }
  };

  if (error) {
    return <ErrorComponent error={error} />;
  } else if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {width < 500 ? (
        <div>
          <div>
            <MobileTab onTabChange={handleTabChange} />
          </div>
          <div>{tab}</div>
        </div>
      ) : (
        <Layout style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
          <div style={{ background: "#fff" }}>
            <Sider>
              <MenuComponent onTabChange={handleTabChange} />
            </Sider>
          </div>
          <div
            style={{
              padding: "24px",
              backgroundColor: "lightgray",
              height: "95vh",
            }}
          >
            {tab}
          </div>
        </Layout>
      )}
    </>
  );
};
