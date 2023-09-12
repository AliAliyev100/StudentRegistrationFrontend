import React from "react";
import { Modal, Button } from "antd";
import { useAuth } from "../../../../contexts/userAuthContext";
import { useFetch } from "../../../../hooks/useFetch";

function DeleteConfirmationModal({
  visible,
  onCancel,
  questionId,
  quizId,
  setQuizQuestions,
  setCurrentQuizInfo,
}) {
  const { userToken, isLoggedIn } = useAuth();

  const removeQuizQuestionurl = `http://localhost:8000/instructor/quizzes/${quizId}/questions/${questionId}`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/json",
    },
    body: null,
  };

  const { data, error, isLoading, fetchData } = useFetch(
    removeQuizQuestionurl,
    options
  );

  const handleRemove = () => {
    fetchData();
    onCancel();
    setCurrentQuizInfo((prevQuizInfo) => ({
      ...prevQuizInfo, // Spread the previous quizInfo
      questions: prevQuizInfo.questions.filter(
        (question) => question !== questionId
      ),
    }));
    setQuizQuestions((prevQuizQuestions) =>
      prevQuizQuestions.filter((question) => question._id !== questionId)
    );
  };

  return (
    <Modal
      title="Confirm Deletion"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" danger onClick={handleRemove}>
          Delete
        </Button>,
      ]}
    >
      Are you sure you want to delete this question?
    </Modal>
  );
}

export default DeleteConfirmationModal;
