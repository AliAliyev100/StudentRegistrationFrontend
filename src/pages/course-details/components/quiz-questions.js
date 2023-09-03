import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { useFetch } from "../../../hooks/useFetch";
import QuizQuestion from "../atoms/quiz-question";

function QuizQuesitons({ quizInfo }) {
  const url = `http://localhost:8000/instructor/${quizInfo._id}/quiz-questions`;
  const { data, error, isLoading, fetchData } = useFetch(url, {});

  const [quizQuestions, setQuizQuestions] = useState([]);

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
          <QuizQuestion question={quizQuestion} index={index} />
        </div>
      ))}
    </div>
  );
}

export default QuizQuesitons;
