import React from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  TimePicker,
  Button,
} from "antd";

function QuizModal({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onCreate(values);
    form.resetFields();
  };

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
      <Form form={form}>
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
          <TimePicker format="HH:mm:ss" showNow={false} />
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
              message: "Please enter Number of Possible Attempts",
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
      </Form>
    </Modal>
  );
}

export default QuizModal;
