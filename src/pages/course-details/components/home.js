import React from "react";
import { Card, Col, Row } from "antd";

const HomeComponent = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={16} style={{ minWidth: 200 }}>
          <Card title="Card title" bordered={true}>
            This is a card about the first card in the first card card about the
            first card in the first card
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} style={{ minWidth: 150 }}>
          <Card title="Card title" bordered={true}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default HomeComponent;
