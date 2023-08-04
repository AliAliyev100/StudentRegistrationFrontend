import React, { useState } from "react";
import {
  HomeOutlined,
  ReadOutlined,
  BellOutlined,
  CommentOutlined,
  BookOutlined,
  CopyOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Home Page", "1", <HomeOutlined />),
  getItem("Course Information", "2", <ReadOutlined />),
  getItem("Announcements", "3", <BellOutlined />),
  getItem("Course Content", "4", <BookOutlined />),
  getItem("Discussions", "5", <CommentOutlined />),
  getItem("Assignments", "6", <CopyOutlined />),
  getItem("My Grades", "7", <BarChartOutlined />),
];
const MenuComponent = ({ onTabChange }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleTabSelect = (e) => {
    onTabChange(e.key);
  };

  return (
    <div
      style={{
        width: 200,
      }}
    >
      <Menu
        mode="inline"
        theme="dark"
        items={items}
        defaultSelectedKeys={["1"]}
        onSelect={handleTabSelect}
        style={{ height: "95vh" }}
      />
    </div>
  );
};
export default MenuComponent;
