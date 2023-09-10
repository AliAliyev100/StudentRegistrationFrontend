import React, { useEffect, useState } from "react";
import { Button } from "antd";
import CreateQuizModal from "../atoms/create-quiz-modal";
import EditQuizModal from "../atoms/edit-quiz-modal";
import QuestionModal from "../atoms/question-modal";

import QuizList from "../atoms/quiz-list";
import QuizQuestions from "./quiz-questions";

import { useFetch } from "../../../hooks/useFetch";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { useParams } from "react-router-dom";

function Quizzes() {
  const { courseId } = useParams();
  const width = useWindowWidth();

  const url = `http://localhost:8000/instructor/${courseId}/quizzes`;

  const [isQuizModalVisible, setIsQuizModalVisible] = useState(false);
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [currentQuizInfo, setCurrentQuizInfo] = useState();
  const [quizzesData, setQuizzesData] = useState([]);

  const [renderQuizQuestions, setRenderQuizQuestions] = useState(false);

  const { data, error, isLoading, fetchData } = useFetch(url, {});

  const showQuizModal = () => {
    setIsQuizModalVisible(true);
    setIsQuestionModalVisible(false);
    setIsEditModalVisible(false);
  };

  const openQuestionCreateModal = (values) => {
    setIsQuizModalVisible(false);
    setIsEditModalVisible(false);
    setIsQuestionModalVisible(true);
  };

  const openEditQuizSelect = (values) => {
    setIsQuizModalVisible(false);
    setIsEditModalVisible(true);
    setIsQuestionModalVisible(false);
  };

  const handleQuizCancel = () => {
    setIsQuizModalVisible(false);
  };

  const handleEditQuizCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleQuestionCancel = () => {
    setCurrentQuizInfo();
    setIsQuestionModalVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.quizzes) {
      setQuizzesData(data.quizzes);
    }
  }, [data]);

  useEffect(() => {
    if (currentQuizInfo) {
      const quizIndexToUpdate = quizzesData.findIndex(
        (quiz) => quiz._id === currentQuizInfo._id
      );

      if (quizIndexToUpdate !== -1) {
        const updatedQuizzesData = [...quizzesData];
        updatedQuizzesData[quizIndexToUpdate] = currentQuizInfo;
        setQuizzesData(updatedQuizzesData);
      }
    }
  }, [currentQuizInfo]);

  return !renderQuizQuestions ? (
    <div>
      <Button
        type="primary"
        onClick={showQuizModal}
        style={{ marginBottom: 15 }}
      >
        Create new Quiz
      </Button>
      <QuizList
        quizzes={quizzesData}
        width={width}
        setCurrentQuizInfo={setCurrentQuizInfo}
        handleCreateQuestionSelect={openQuestionCreateModal}
        handleEditQuizSelect={openEditQuizSelect}
        setRenderQuizQuestions={setRenderQuizQuestions}
      />
      {currentQuizInfo && (
        <EditQuizModal
          visible={isEditModalVisible}
          setEditModalVisibile={setIsEditModalVisible}
          onCancel={handleEditQuizCancel}
          quizData={currentQuizInfo}
          setCurrentQuiz={setCurrentQuizInfo}
        />
      )}
      <CreateQuizModal
        visible={isQuizModalVisible}
        onCreate={openQuestionCreateModal}
        onCancel={handleQuizCancel}
        setCurrentQuizInfo={setCurrentQuizInfo}
      />
      {currentQuizInfo && (
        <QuestionModal
          visible={isQuestionModalVisible}
          setCurrentQuizInfo={setCurrentQuizInfo}
          currentQuizInfo={currentQuizInfo}
          onCancel={handleQuestionCancel}
        />
      )}
    </div>
  ) : (
    <QuizQuestions
      currentQuizInfo={currentQuizInfo}
      setCurrentQuizInfo={setCurrentQuizInfo}
      setRenderQuizQuestions={setRenderQuizQuestions}
    />
  );
}

export default Quizzes;
