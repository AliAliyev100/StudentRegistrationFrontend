import React, { useEffect, useState } from "react";
import { Button } from "antd";
import CreateQuizModal from "../atoms/create-quiz-modal";
import QuestionModal from "../atoms/question-modal";
import QuizList from "../atoms/quiz-list";
import { useFetch } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";

function Quizzes({ width }) {
  const { courseId } = useParams();

  const [isQuizModalVisible, setIsQuizModalVisible] = useState(false);
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
  const [currentQuizInfo, setCurrentQuizInfo] = useState();

  const [quizzesData, setQuizzesData] = useState([]);
  const url = `http://localhost:8000/instructor/${courseId}/quizzes`;

  const { data, error, isLoading, fetchData } = useFetch(url, {});

  const showQuizModal = () => {
    setIsQuizModalVisible(true);
  };

  const handleQuizCreateOrSelect = (values) => {
    setIsQuizModalVisible(false);
    setIsQuestionModalVisible(true);
  };

  const handleQuizCancel = () => {
    setIsQuizModalVisible(false);
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

  return (
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
        currentQuizInfo={currentQuizInfo}
        onSelect={handleQuizCreateOrSelect}
      />
      <CreateQuizModal
        visible={isQuizModalVisible}
        onCreate={handleQuizCreateOrSelect}
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
  );
}

export default Quizzes;
