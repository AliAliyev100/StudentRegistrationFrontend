import { React } from "react";
import { Modal, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export const NewAnnouncementForm = ({
  visible,
  onCreate,
  onCancel,
  handleInputChange,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      open={visible}
      title="Create a new Announcement"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item
          name="title" // Make sure 'name' prop matches the field name in the form values
          label="Announcement Title"
          rules={[
            {
              required: true,
              message: "Please input the announcement title!",
            },
          ]}
        >
          <Input onChange={(e) => handleInputChange("title", e.target.value)} />
        </Form.Item>
        <Form.Item
          name="content" // Make sure 'name' prop matches the field name in the form values
          label="Announcement Content"
          rules={[
            {
              required: true,
              message: "Please input the announcement content!",
            },
          ]}
        >
          <TextArea
            rows={4}
            onChange={(e) => handleInputChange("content", e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
