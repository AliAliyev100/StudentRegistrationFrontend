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
  const [selectedTab, setSelectedTab] = useState("1");
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleTabSelect = (e) => {
    setSelectedTab(e.key);
    onTabChange(e.key);
  };

  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
          marginTop: 10,
          backgroundColor: "black",
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        defaultSelectedKeys={["1"]}
        onSelect={handleTabSelect}
      />
    </div>
  );
};
export default MenuComponent;
