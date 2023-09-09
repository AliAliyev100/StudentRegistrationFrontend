import React, { useState } from "react";
import { Card, List, Button, Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import DeleteConfirmationModal from "./delete-confirmation-modal";
import EditQuizQuestionModal from "./edit-quiz-question";

function QuizQuestion({
  question,
  index,
  quizId,
  setQuizQuestions,
  currentQuizInfo,
  setCurrentQuizInfo,
}) {
  const {
    question: questionText,
    variants,
    questionType,
    answers,
    caseSensitive,
  } = question;

  const [isDeleteConfModalOpen, setIsDeleteConfModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New state variable

  const showEditModal = () => {
    setIsEditModalOpen(true); // Open the EditQuizQuestionModal when "Edit" button is clicked
  };

  const hideEditModal = () => {
    setIsEditModalOpen(false); // Close the EditQuizQuestionModal
  };

  const showDeleteModal = () => {
    setIsDeleteConfModalOpen(true);
  };

  const hideDeleteModal = () => {
    setIsDeleteConfModalOpen(false);
  };

  return (
    <div>
      <Card title={`Question ${index + 1}`} style={cardStyle}>
        <p style={italicText}>
          Type: <span style={boldText}>{questionType} </span>
        </p>
        <p style={italicText}>
          Question: <span style={boldText}>{questionText} </span>
        </p>
        {caseSensitive !== undefined ? (
          <p style={italicText}>
            Case Sensitive:{" "}
            <span style={boldText}>{caseSensitive.toString()} </span>
          </p>
        ) : null}
        <hr />
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
            <p style={boldText}>Answers:</p>
            {answers.map((answer, aIndex) => (
              <Tag key={aIndex}>{answer}</Tag>
            ))}
          </div>
        ) : null}

        <Button
          type="primary"
          icon={<EditOutlined style={{ verticalAlign: "middle" }} />}
          style={{ marginRight: "10px", marginTop: "20px", minWidth: "175px" }}
          onClick={() => showEditModal(index)}
        >
          Edit Question
        </Button>
        <Button
          type="dashed"
          icon={<DeleteOutlined style={{ verticalAlign: "middle" }} />}
          style={{ marginRight: "10px", marginTop: "10px", minWidth: "175px" }}
          danger
          onClick={() => showDeleteModal(index)}
        >
          Remove Question
        </Button>
      </Card>
      <DeleteConfirmationModal
        visible={isDeleteConfModalOpen}
        onCancel={hideDeleteModal}
        questionId={question._id}
        quizId={quizId}
        setQuizQuestions={setQuizQuestions}
      />
      {isEditModalOpen === true && (
        <EditQuizQuestionModal
          question={question}
          visible={isEditModalOpen}
          currentQuizInfo={currentQuizInfo}
          setCurrentQuizInfo={setCurrentQuizInfo}
          onCancel={hideEditModal}
          questionIndex={index + 1}
        />
      )}
    </div>
  );
}
const cardStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  fontFamily: "Arial, sans-serif",
  fontWeight: "normal",
  backgroundColor: "white",
};

const italicText = {
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

const boldText = {
  fontWeight: "bold",
};

export default QuizQuestion;
