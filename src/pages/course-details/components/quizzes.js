import React, { useState } from "react";
import { Button } from "antd";
import CreateQuizModal from "../atoms/create-quiz-modal";
import QuestionModal from "../atoms/question-modal";

function Quizzes() {
  const [isQuizModalVisible, setIsQuizModalVisible] = useState(false);
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
  const [quizInfo, setQuizInfo] = useState(null);
  const [quizId, setQuizId] = useState(null);

  const showQuizModal = () => {
    setIsQuizModalVisible(true);
  };

  const handleQuizCreate = (values) => {
    console.log(values);
    setQuizInfo(values);
    setIsQuizModalVisible(false);
    setIsQuestionModalVisible(true);
  };

  const handleQuizCancel = () => {
    setIsQuizModalVisible(false);
  };

  const handleQuestionCreate = (question) => {
    console.log(question);
  };

  const handleQuestionCancel = () => {
    setIsQuestionModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showQuizModal}>
        Create new Quiz
      </Button>
      <CreateQuizModal
        visible={isQuizModalVisible}
        onCreate={handleQuizCreate}
        onCancel={handleQuizCancel}
        setQuizId={setQuizId}
      />
      <QuestionModal
        visible={isQuestionModalVisible && quizId !== null}
        quizInfo={quizInfo}
        onQuestionCreate={handleQuestionCreate}
        onCancel={handleQuestionCancel}
        quizId={quizId}
      />
    </div>
  );
}

export default Quizzes;
