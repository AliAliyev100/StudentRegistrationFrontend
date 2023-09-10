import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { useFetch } from "../../../hooks/useFetch";
import QuizQuestion from "../atoms/quiz-question";
import { LeftOutlined } from "@ant-design/icons"; // Import the left arrow icon
import Quizzes from "./quizzes";

function QuizQuestions({
  currentQuizInfo,
  setCurrentQuizInfo,
  setRenderQuizQuestions,
}) {
  const url = `http://localhost:8000/instructor/${currentQuizInfo._id}/quiz-questions`;
  const { data, error, isLoading, fetchData } = useFetch(url, {});

  const [quizQuestions, setQuizQuestions] = useState([]);

  const handleGoBack = () => {
    setRenderQuizQuestions(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.quizQuestions) {
      setQuizQuestions(data.quizQuestions);
    }
  }, [data]);

  return (
    <div>
      {quizQuestions.map((quizQuestion, index) => (
        <div key={quizQuestion._id}>
          <QuizQuestion
            question={quizQuestion}
            index={index}
            quizId={currentQuizInfo._id}
            setQuizQuestions={setQuizQuestions}
            currentQuizInfo={currentQuizInfo}
            setCurrentQuizInfo={setCurrentQuizInfo}
          />
          <br />
        </div>
      ))}
      <Button
        icon={<LeftOutlined style={{ verticalAlign: "middle" }} />} // Add the left arrow icon
        style={{ marginTop: "10px" }} // Add some margin for spacing
        onClick={handleGoBack}
      >
        Go Back
      </Button>
    </div>
  );
}

export default QuizQuestions;
