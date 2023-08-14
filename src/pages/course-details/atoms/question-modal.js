import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Checkbox, Radio } from "antd";

const { Option } = Select;

function QuestionModal({ visible, quizInfo, onQuestionCreate, onCancel }) {
  const [form] = Form.useForm();
  const [questionType, setQuestionType] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [multipleAnswerValues, setMultipleAnswerValues] = useState([
    { text: "", isTrue: false },
  ]);

  const onFinish = (values) => {
    const questionData = {
      ...values,
      questionType,
      ignoreCase,
      answers: multipleAnswerValues,
      quizId: quizInfo.id,
    };
    onQuestionCreate(questionData);
    form.resetFields();
    setQuestionType("");
    setIgnoreCase(false);
    setMultipleAnswerValues([{ text: "", isTrue: false }]);
  };

  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
    setIgnoreCase(false);
    setMultipleAnswerValues([{ text: "", isTrue: false }]);
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

  return (
    <Modal
      open={visible}
      title="Add Question"
      okText="Add Question"
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
      <Form form={form} layout="vertical">
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
            <Form.Item label="Ignore Case">
              <Checkbox
                checked={ignoreCase}
                onChange={(e) => setIgnoreCase(e.target.checked)}
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
            <Button>Previous Question</Button>
          </>
        )}
      </Form>
    </Modal>
  );
}

export default QuestionModal;
