import React from "react";
import { Collapse, List } from "antd";
import { HourglassOutlined } from "@ant-design/icons";

const data = [
  {
    title: " Assignment 1",
  },
];
const pastDueitems = [
  {
    label: (
      <>
        <span style={{ color: "#188ac4", fontWeight: "bold" }}>All Items</span>
        <span> (0)</span>
      </>
    ),
    children: (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a href="https://ant.design">
                  <HourglassOutlined style={{ fontSize: "20px", color: "#" }} />
                  {item.title}
                </a>
              }
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    ),
  },
];

const todayitems = [
  {
    label: (
      <>
        <span style={{ color: "#188ac4", fontWeight: "bold" }}>Today </span>
        <span> (0)</span>
      </>
    ),
    children: <p>{"text"}</p>,
  },
];

const tomorrowItems = [
  {
    label: (
      <>
        <span style={{ color: "#188ac4", fontWeight: "bold" }}>Tomorrow</span>
        <span> (0)</span>
      </>
    ),
    children: <p>{"text"}</p>,
  },
];

const thisWeekItems = [
  {
    label: (
      <>
        <span style={{ color: "#188ac4", fontWeight: "bold" }}>This Week</span>
        <span> (0)</span>
      </>
    ),
    children: <p>{"text"}</p>,
  },
];

const futureItems = [
  {
    label: (
      <>
        <span style={{ color: "#188ac4", fontWeight: "bold" }}>Future</span>
        <span> (0)</span>
      </>
    ),
    children: <p>{"text"}</p>,
  },
];

const DeadlinesList = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <>
      <h3
        style={{
          fontWeight: "bold",
          fontFamily: "Open Sans, sans-serif",
          color: "#666666",
          fontSize: "15px",
        }}
      >
        What is past due
      </h3>
      <Collapse
        ghost
        onChange={onChange}
        items={pastDueitems}
        style={{ fontWeight: "bold", marginBottom: "25px" }}
      />
      <hr />
      <Collapse
        ghost
        onChange={onChange}
        items={todayitems}
        style={{ fontWeight: "bold" }}
      />{" "}
      <hr />
      <Collapse
        ghost
        onChange={onChange}
        items={tomorrowItems}
        style={{ fontWeight: "bold" }}
      />
      <hr />
      <Collapse
        ghost
        onChange={onChange}
        items={thisWeekItems}
        style={{ fontWeight: "bold" }}
      />
      <hr />
      <Collapse
        ghost
        onChange={onChange}
        items={futureItems}
        style={{ fontWeight: "bold" }}
      />
      <hr />
    </>
  );
};
export default DeadlinesList;
