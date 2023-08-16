import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/userAuthContext";
import { useFetch } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";

import {
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  TimePicker,
  Checkbox,
} from "antd";

const createQuizUrl = "http://localhost:8000/instructor/create-quiz";

function QuizModal({ visible, onCreate, onCancel, setQuizId }) {
  const { userToken, isLoggedIn } = useAuth();
  const { courseId } = useParams();

  const [quizValues, setQuizValues] = useState({
    courseId: courseId,
    backtrackingAllowed: false,
    resultsVisible: false,
    answersAvailable: false,
  });

  const [options, setOptions] = useState({
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/json",
    },
    body: null,
  });

  const { data, error, isLoading, fetchData } = useFetch(
    createQuizUrl,
    options
  );

  const [form] = Form.useForm();

  const onFinish = (values) => {
    onCreate(values);
    form.resetFields();
    fetchData();
  };

  const handleQuizValuesChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      setQuizValues({ ...quizValues, [id]: checked });
    } else if (id === "quizDuration") {
      if (isValidTimeFormat(value)) {
        setQuizValues({ ...quizValues, [id]: value });
      }
    } else if (id === "startDate" || id === "endDate") {
      setQuizValues({ ...quizValues, [id]: value });
    } else if (
      id === "contribution" ||
      id === "attempts" ||
      id === "totalPoints"
    ) {
      const numericValue = parseFloat(value);

      if (!isNaN(numericValue)) {
        let sanitizedValue;

        if (id === "totalPoints") {
          sanitizedValue = Math.max(1, Math.min(1000, numericValue));
        } else if (id === "attempts") {
          sanitizedValue = Math.max(
            1,
            Math.min(1000, Math.round(numericValue))
          );
        } else if (id === "contribution") {
          sanitizedValue = Math.max(0, Math.min(100, Math.round(numericValue)));
        }

        setQuizValues({ ...quizValues, [id]: sanitizedValue.toString() });
      }
    } else {
      setQuizValues({ ...quizValues, [id]: value });
    }
  };

  const handleDatePickerChange = (field, value) => {
    setQuizValues((prevValues) => ({
      ...prevValues,
      [field]: value ? value.toISOString() : undefined,
    }));
  };

  const handleTimePickerChange = (field, time, timeString) => {
    setQuizValues((prevValues) => ({
      ...prevValues,
      [field]: timeString || undefined,
    }));
  };

  const handleInputNumberChange = (field, value) => {
    setQuizValues((prevValues) => ({
      ...prevValues,
      [field]: !isNaN(value) ? value.toString() : undefined,
    }));
  };

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      body: JSON.stringify(quizValues),
    }));
  }, [quizValues]);

  useEffect(() => {
    if (data && data.quizId) {
      setQuizId(data.quizId);
    }
  }, [data]);

  return (
    <Modal
      open={visible}
      title="Create New Quiz"
      okText="Create Quiz"
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
      <Form form={form} onChange={handleQuizValuesChange}>
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
          <DatePicker
            showTime
            onChange={(date) => handleDatePickerChange("startDate", date)}
          />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="Quiz End Date"
          rules={[{ required: true, message: "Please select Quiz End Date" }]}
        >
          <DatePicker
            showTime
            onChange={(date) => handleDatePickerChange("endDate", date)}
          />
        </Form.Item>
        <Form.Item
          name="quizDuration"
          label="Quiz Duration (HH:MM:SS)"
          rules={[{ required: true, message: "Please select Quiz Duration" }]}
        >
          <TimePicker
            format="HH:mm:ss"
            showNow={false}
            onChange={(time, timeString) =>
              handleTimePickerChange("quizDuration", time, timeString)
            }
          />
        </Form.Item>
        <Form.Item
          name="totalPoints"
          label="Quiz Total Points"
          rules={[
            { required: true, message: "Please enter Quiz Total Points" },
          ]}
        >
          <InputNumber
            min={1}
            max={1000}
            step={0.5}
            onChange={(value) => handleInputNumberChange("totalPoints", value)}
          />
        </Form.Item>
        <Form.Item
          name="attempts"
          label="Number of Possible Attempts"
          rules={[
            {
              required: true,
              message: "Please enter Number of Possible Attempts",
            },
          ]}
        >
          <InputNumber
            min={1}
            max={1000}
            step={1}
            onChange={(value) => handleInputNumberChange("attempts", value)}
          />
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
          <InputNumber
            min={0}
            max={100}
            step={1}
            onChange={(value) => handleInputNumberChange("contribution", value)}
          />
        </Form.Item>
        <Form.Item
          name="backtrackingAllowed"
          label="Backtracking Allowed"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          name="resultsVisible"
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

function isValidTimeFormat(timeString) {
  const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
  if (!regex.test(timeString)) {
    return false;
  }

  const components = timeString.split(":");
  if (components.length !== 3) {
    return false; // There should be exactly three components
  }
  const [hours, minutes, seconds] = components;

  const validHours = parseInt(hours, 10) >= 0 && parseInt(hours, 10) <= 23;
  const validMinutes =
    parseInt(minutes, 10) >= 0 && parseInt(minutes, 10) <= 59;
  const validSeconds =
    parseInt(seconds, 10) >= 0 && parseInt(seconds, 10) <= 59;

  return validHours && validMinutes && validSeconds;
}

export default QuizModal;
