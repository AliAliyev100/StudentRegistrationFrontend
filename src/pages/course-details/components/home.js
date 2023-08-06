import React from "react";
import { Card, Col, Row, Collapse } from "antd";
import DeadlinesList from "./deadlines-list";

const newItems = [
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

const HomeComponent = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col
          xs={20}
          sm={20}
          md={12}
          style={{ minWidth: 200, marginBottom: "1rem" }}
        >
          <Card
            title="My Announcements"
            bordered={true}
            style={{ marginBottom: "2rem" }}
          >
            This is a card about the first card in the first card card about the
            first card in the first card
          </Card>
          <Card
            title="My Tasks"
            bordered={true}
            style={{ marginBottom: "2rem" }}
          >
            This is a card about the first card in the first card card about the
            first card in the first card
          </Card>

          <Card
            title="What is new"
            bordered={true}
            style={{ marginBottom: "2rem" }}
          >
            <Collapse ghost style={{ fontWeight: "bold" }} items={newItems} />
          </Card>
        </Col>
        <Col xs={20} sm={20} md={12} style={{ minWidth: 200 }}>
          <Card title="To do" bordered={true}>
            <DeadlinesList />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default HomeComponent;
