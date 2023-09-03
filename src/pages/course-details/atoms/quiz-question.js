import React from "react";
import { Card, List, Button, Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function QuizQuestion({ question, index, onEdit, onRemove }) {
  const { question: questionText, variants, type, answers } = question;

  const cardStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    fontWeight: "normal",
    backgroundColor: "white",
  };

  const typeStyle = {
    fontStyle: "italic",
    textTransform: "capitalize",
  };

  const variantStyle = {
    display: "flex",
    alignItems: "center",
  };

  const checkStyle = {
    marginRight: "8px",
    fontSize: "18px",
    color: "green",
  };

  const crossStyle = {
    marginRight: "8px",
    fontSize: "18px",
    color: "red",
  };

  const textStyle = {
    flex: 1,
  };

  return (
    <Card title={`Question ${index + 1}`} style={cardStyle}>
      <p style={typeStyle}>Type: {type}</p>
      <p>{questionText}</p>
      {variants && variants.length > 0 ? (
        <List
          dataSource={variants}
          renderItem={(variant, vIndex) => (
            <List.Item key={vIndex} style={variantStyle}>
              {variant.isTrue ? (
                <CheckCircleOutlined style={checkStyle} />
              ) : (
                <CloseCircleOutlined style={crossStyle} />
              )}
              <span style={textStyle}>{variant.text}</span>
            </List.Item>
          )}
        />
      ) : null}

      {answers && answers.length > 0 ? (
        <div>
          <p>Answers:</p>
          {answers.map((answer, aIndex) => (
            <Tag key={aIndex}>{answer}</Tag>
          ))}
        </div>
      ) : null}

      <Button
        type="primary"
        icon={<EditOutlined style={{ verticalAlign: "middle" }} />}
        style={{ marginRight: "10px", marginTop: "20px", minWidth: "175px" }}
        onClick={() => onEdit(index)}
      >
        Edit Question
      </Button>
      <Button
        type="dashed"
        icon={<DeleteOutlined style={{ verticalAlign: "middle" }} />}
        style={{ marginRight: "10px", marginTop: "10px", minWidth: "175px" }}
        onClick={() => onRemove(index)}
      >
        Remove Question
      </Button>
    </Card>
  );
}

export default QuizQuestion;
