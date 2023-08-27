import React, { useEffect } from "react";
import { Card, Button } from "antd";

function QuizList({
  quizzes,
  width,
  setCurrentQuizInfo,
  currentQuizInfo,
  onSelect,
}) {
  const handleClickAddQuestion = (quizInfo) => {
    setCurrentQuizInfo(quizInfo);
  };

  useEffect(() => {
    onSelect();
  }, [currentQuizInfo]);

  return (
    <div>
      {width > 800
        ? quizzes.map((quiz) => (
            <Card key={quiz._id} style={quizCardStyle}>
              <div>
                <h2 style={quizNameStyle}>{quiz.quizName}</h2>
              </div>
              <div style={infoContainerStyle}>
                <div style={infoColumnStyle}>
                  <p style={infoTextStyle}>Total Points: {quiz.totalPoints}</p>
                  <p style={infoTextStyle}>Attempts: {quiz.attempts}</p>
                  <p style={infoTextStyle}>Contribution: {quiz.contribution}</p>
                </div>
                <div style={infoColumnStyle}>
                  <p style={infoTextStyle}>
                    Backtracking Allowed: {quiz.backtrackingAllowed.toString()}
                  </p>
                  <p style={infoTextStyle}>
                    Result Visible: {quiz.resultVisible.toString()}
                  </p>
                  <p style={infoTextStyle}>
                    Answers Available: {quiz.answersAvailable.toString()}
                  </p>
                </div>
                <div style={infoColumnStyle}>
                  <p style={infoTextStyle}>Start Date: {quiz.startDate}</p>
                  <p style={infoTextStyle}>End Date: {quiz.endDate}</p>
                  <p style={infoTextStyle}>
                    Quiz Duration: {quiz.quizDuration}
                  </p>
                </div>
              </div>
              <div style={buttonColumnStyle}>
                <Button
                  type="default"
                  style={buttonStyle}
                  onClick={() => handleClickAddQuestion(quiz)}
                >
                  Add a Question
                </Button>
                <Button type="default" style={buttonStyle}>
                  Remove Quiz
                </Button>
                <Button type="default" style={buttonStyle}>
                  Edit Quiz
                </Button>
                <Button type="default" style={buttonStyle}>
                  Finish Quiz
                </Button>
                <Button type="default" style={buttonStyle}>
                  View Questions
                </Button>
              </div>
            </Card>
          ))
        : null}
    </div>
  );
}

const quizCardStyle = {
  marginBottom: "20px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
};

const infoContainerStyle = {
  float: "left",
};

const infoColumnStyle = {
  flex: 1,
  marginRight: "20px",
  marginBottom: "10px",
};

const buttonColumnStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  float: "right",
};

const quizNameStyle = {
  fontSize: "1.5rem",
  marginBottom: "30px",
  fontFamily: "cursive",
};

const infoTextStyle = {
  marginBottom: "10px",
  fontFamily: "Tahoma, sans-serif",
};

const buttonStyle = {
  width: "100%",
  marginBottom: "10px",
};

export default QuizList;
