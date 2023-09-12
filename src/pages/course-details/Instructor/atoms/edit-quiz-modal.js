import React, { useState, useEffect } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { useAuth } from "../../../../contexts/userAuthContext";

import dayjs, { format } from "dayjs";

import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Checkbox,
  TimePicker,
} from "antd";

const editQuizUrl = "http://localhost:8000/instructor/edit-quiz";

function EditQuizModal({
  visible,
  setEditModalVisibile,
  onCancel,
  quizData,
  setCurrentQuiz,
}) {
  const { userToken, isLoggedIn } = useAuth();

  const [form] = Form.useForm();
  const { questions, ...initialDataWithoutQuestions } = quizData;

  const [editedQuizData, setEditedQuizData] = useState({
    ...initialDataWithoutQuestions,
  });

  const [initialData, setInitialData] = useState({
    ...initialDataWithoutQuestions,
    startDate: dayjs(quizData.startDate),
    endDate: dayjs(quizData.endDate),
    quizDuration: dayjs(quizData.quizDuration, "HH:mm:ss"),
  });

  useEffect(() => {
    const { questions, ...initialDataWithoutQuestions } = quizData;
    setEditedQuizData({ ...initialDataWithoutQuestions });

    const newInitialData = {
      ...initialDataWithoutQuestions,
      startDate: dayjs(quizData.startDate),
      endDate: dayjs(quizData.endDate),
      quizDuration: dayjs(quizData.quizDuration, "HH:mm:ss"),
    };

    setInitialData(newInitialData);
  }, [quizData]);

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData]);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    },
    body: JSON.stringify({
      ...editedQuizData,
    }),
  };

  const { data, error, isLoading, fetchData } = useFetch(editQuizUrl, options);

  const handleFormChange = (changedValues, allValues) => {
    if ("quizDuration" in allValues) {
      allValues.quizDuration = dayjs(allValues.quizDuration).format("HH:mm:ss");
    }
    setEditedQuizData((prevData) => ({
      ...prevData,
      ...allValues,
    }));
  };

  const handleUpdateQuiz = () => {
    form
      .validateFields()
      .then((values) => {
        fetchData();
      })
      .catch((errorInfo) => {
        console.error("Form validation failed:", errorInfo);
      });
  };

  useEffect(() => {
    if (data) {
      setEditModalVisibile(false);
      if (data.quiz) {
        setCurrentQuiz(data.quiz);
      }
    }
  }, [data]);

  return (
    <Modal
      key={quizData._id}
      open={visible}
      title="Edit Quiz"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdateQuiz}>
          Update Quiz
        </Button>,
      ]}
    >
      <Form
        form={form}
        onValuesChange={handleFormChange}
        initialValues={initialData}
      >
        <Form.Item
          name="quizName"
          label="Quiz Name"
          rules={[{ required: true, message: "Please enter Quiz Name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Quiz Start Date"
          rules={[{ required: true, message: "Please select Quiz Start Date" }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="Quiz End Date"
          rules={[{ required: true, message: "Please select Quiz End Date" }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="quizDuration"
          label="Quiz Duration (HH:MM:SS)"
          rules={[{ required: true, message: "Please select Quiz Duration" }]}
        >
          <TimePicker showNow={false} />
        </Form.Item>
        <Form.Item
          name="totalPoints"
          label="Quiz Total Points"
          rules={[
            { required: true, message: "Please enter Quiz Total Points" },
          ]}
        >
          <InputNumber min={1} max={1000} step={0.5} />
        </Form.Item>
        <Form.Item
          name="attempts"
          label="Number of Possible Attempts"
          rules={[
            {
              required: true,
              message: "Please enter a value",
            },
            {
              validator(_, value) {
                if (value === undefined || Number.isInteger(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Please enter an integer"));
              },
            },
          ]}
        >
          <InputNumber min={1} max={1000} step={1} />
        </Form.Item>
        <Form.Item
          name="contribution"
          label="Contribution to Final"
          rules={[
            {
              required: true,
              message: "Please enter Contribution points to Final grade",
            },
          ]}
        >
          <InputNumber min={0} max={100} step={1} />
        </Form.Item>
        <Form.Item
          name="backtrackingAllowed"
          label="Backtracking Allowed"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          name="resultVisible"
          label="Results Visible"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          name="answersAvailable"
          label="Answers Available"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditQuizModal;
