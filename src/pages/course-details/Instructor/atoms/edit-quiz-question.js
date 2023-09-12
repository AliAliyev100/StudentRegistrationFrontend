import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, Checkbox, Radio } from "antd";

import { useFetch } from "../../../../hooks/useFetch";
import { useAuth } from "../../../../contexts/userAuthContext";

import Loading from "../../../../components/loading";

const { Option } = Select;
const baseURL = `http://localhost:8000/instructor/edit-quiz-question`;

function EditQuestionModal({
  visible,
  question,
  currentQuizInfo,
  onCancel,
  questionIndex,
  setQuizQuestions,
}) {
  const { userToken } = useAuth();

  const [form] = Form.useForm();
  const [questionType, setQuestionType] = useState(question.questionType);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [multipleAnswerValues, setMultipleAnswerValues] = useState(
    question.variants || []
  );
  const [questionValues, setQuestionValues] = useState(question);

  const [options, setOptions] = useState({
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...(questionType === "open" ? {} : { variants: multipleAnswerValues }), // Only include variants if not "open"
      ...questionValues,
    }),
  });

  const { data, error, isLoading, fetchData } = useFetch(baseURL, options);

  const onFinish = (values) => {
    fetchData();
    onCancel();
  };

  const handleQuestionValuesChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox" && id.length > 0) {
      setQuestionValues({ ...questionValues, [id]: checked });
    } else if (type === "text") {
      if (id === "answers") {
        setQuestionValues({ ...questionValues, [id]: value.split(",") });
      } else if (id === "question") {
        setQuestionValues({ ...questionValues, [id]: value });
      }
    }
  };

  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
    setIgnoreCase(false);
    setMultipleAnswerValues([{ text: "", isTrue: false }]);
    setQuestionValues({ ...questionValues, questionType: value });
  };

  const handleAddAnswer = () => {
    setMultipleAnswerValues([
      ...multipleAnswerValues,
      { text: "", isTrue: false },
    ]);
  };

  const handleAnswerChange = (index, value) => {
    const updatedValues = [...multipleAnswerValues];
    updatedValues[index].text = value;
    setMultipleAnswerValues(updatedValues);
  };

  const handleIsTrueChange = (index, checked) => {
    const updatedValues = [...multipleAnswerValues];
    updatedValues[index].isTrue = checked;
    setMultipleAnswerValues(updatedValues);
  };
  const handleSingleAnswerTrue = (index) => {
    const updatedAnswers = multipleAnswerValues.map((answer, i) => ({
      ...answer,
      isTrue: i === index,
    }));
    setMultipleAnswerValues(updatedAnswers);
  };

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      body: JSON.stringify({
        ...questionValues,
        quizId: currentQuizInfo._id,
        ...(questionType === "open" ? {} : { variants: multipleAnswerValues }), // Only include variants if not "open"
      }),
    }));
  }, [questionType, questionValues, multipleAnswerValues]);

  useEffect(() => {
    if (data && data.updatedQuizQuestion) {
      const updatedQuestion = data.updatedQuizQuestion;
      setQuizQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.map((question) => {
          if (question._id === updatedQuestion._id) {
            return updatedQuestion;
          } else {
            return question;
          }
        });
        return updatedQuestions;
      });
    }
  }, [data]);

  useEffect(() => {
    setQuestionValues(question);
  }, [currentQuizInfo]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal
      open={visible}
      title={`Edit Question ${questionIndex}`}
      okText="Edit Question"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onChange={handleQuestionValuesChange}
        initialValues={{
          question: question.question,
          ...multipleAnswerValues.reduce((acc, variant, index) => {
            acc[`answers[${index}].text`] = variant.text;
            return acc;
          }, {}),
          answers: question.answers,
        }}
      >
        <Form.Item label="Question Type">
          <Select onChange={handleQuestionTypeChange} value={questionType}>
            <Option value="multiple">Multiple Answer question</Option>
            <Option value="single">Single Answer question</Option>
            <Option value="open">Open ended question</Option>
          </Select>
        </Form.Item>
        {questionType === "open" && (
          <>
            <Form.Item
              name="question"
              label="Question"
              rules={[{ required: true, message: "Please enter the question" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="answers"
              label="Answers (separated by commas)"
              rules={[{ required: true, message: "Please enter the answers" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Ignore Case" name="ignoreCase">
              <Checkbox
                checked={ignoreCase}
                onChange={(e) => {
                  setIgnoreCase(e.target.checked);
                  handleQuestionValuesChange(e);
                }}
              >
                Ignore Case
              </Checkbox>
            </Form.Item>
          </>
        )}
        {questionType === "multiple" && (
          <>
            <Form.Item
              name="question"
              label="Question"
              rules={[{ required: true, message: "Please enter the question" }]}
            >
              <Input />
            </Form.Item>
            {multipleAnswerValues.map((answer, index) => (
              <div key={index}>
                <Form.Item
                  label={`Answer ${index + 1}`}
                  name={`answers[${index}].text`}
                  rules={[
                    { required: true, message: "Please enter the answer" },
                    {
                      min: 1,
                      message: "Answer must have at least one character",
                    },
                  ]}
                >
                  <Input
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Checkbox
                    checked={answer.isTrue}
                    onChange={(e) =>
                      handleIsTrueChange(index, e.target.checked)
                    }
                  >
                    Is True
                  </Checkbox>
                </Form.Item>
              </div>
            ))}

            <Button onClick={handleAddAnswer}>Add Another Answer</Button>
            <h1></h1>
          </>
        )}
        {questionType === "single" && (
          <>
            <Form.Item
              name="question"
              label="Question"
              rules={[{ required: true, message: "Please enter the question" }]}
            >
              <Input />
            </Form.Item>
            {multipleAnswerValues.map((answer, index) => (
              <div key={index}>
                <Form.Item
                  label={`Answer ${index + 1}`}
                  name={`answers[${index}].text`}
                  rules={[
                    { required: true, message: "Please enter the answer" },
                    {
                      min: 1,
                      message: "Answer must have at least one character",
                    },
                  ]}
                >
                  <Input
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Radio
                    checked={answer.isTrue}
                    onChange={() => handleSingleAnswerTrue(index)}
                  >
                    Correct Answer
                  </Radio>
                </Form.Item>
              </div>
            ))}
            <Button onClick={handleAddAnswer}>Add Another Answer</Button>
          </>
        )}
      </Form>
    </Modal>
  );
}

export default EditQuestionModal;
