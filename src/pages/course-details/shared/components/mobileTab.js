import {
  HomeOutlined,
  ReadOutlined,
  BellOutlined,
  BookOutlined,
  CommentOutlined,
  CopyOutlined,
  BarChartOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import "../../../../css/course-details.css";

const MobileTab = ({ onTabChange }) => {
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
    getItem("Quizzes", "8", <EditOutlined />),
  ];

  const handleTabSelect = (key) => {
    onTabChange(key);
  };

  return (
    <div style={{ paddingLeft: "10px" }}>
      <Tabs
        onChange={handleTabSelect}
        defaultActiveKey="1"
        items={items.map((item) => ({
          label: (
            <span>
              {item.icon}
              <span className="dropdown-item-label">{item.label}</span>{" "}
              {/* Add css to dropdown hidden items */}
            </span>
          ),
          key: item.key,
          children: item.children,
        }))}
      />
    </div>
  );
};
export default MobileTab;
