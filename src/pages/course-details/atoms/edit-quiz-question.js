import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Checkbox, Radio } from "antd";

const EditQuizQuestionModal = ({ visible, question }) => {
  const [form] = Form.useForm();

  const [questionValues, setQuestionValues] = useState(question);

  const [editedVariants, setEditedVariants] = useState([]);

  useEffect(() => {
    if (visible) {
      let initialValue = {
        question: question.question,
      };

      if (question.type === "open") {
        const answersString = question.answers.join(", ");
        initialValue = {
          ...initialValue,
          answers: answersString,
          caseSensitive: question.caseSensitive,
        };
      } else if (question.type === "multiple" || question.type === "single") {
        initialValue = {
          ...initialValue,
          variants: question.variants,
        };
      }

      if (question.type === "multiple") {
        const initialVariants = [];
        question.variants.forEach((variant) => {
          if (variant.isTrue) {
            initialVariants.push(variant.text);
          }
        });
        initialValue.variants = initialVariants;
      } else if (question.type === "single") {
        const initialVariant = question.variants.find(
          (variant) => variant.isTrue
        );
        initialValue.variants = initialVariant
          ? initialVariant.text
          : undefined;
      }

      form.setFieldsValue(initialValue);

      setEditedVariants(question.variants);
    }
  }, [visible, form, question]);

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

  const handleVariantTextChange = (index, newText) => {
    const updatedVariants = [...editedVariants];
    updatedVariants[index].text = newText;
    setEditedVariants(updatedVariants);
  };

  useEffect(() => {
    console.log(editedVariants);
  }, [editedVariants]);

  return (
    <Modal title="Edit Quiz Question" open={visible} destroyOnClose>
      <Form form={form} onChange={handleQuestionValuesChange}>
        <Form.Item
          name="question"
          label="Question"
          rules={[{ required: true, message: "Please enter a question" }]}
        >
          <Input />
        </Form.Item>
        {question.type === "open" && (
          <Form.Item
            name="answers"
            label="Answers (Comma-separated)"
            rules={[{ required: true, message: "Please enter answers" }]}
          >
            <Input />
          </Form.Item>
        )}
        {question.type === "multiple" && (
          <Form.Item name="variants" label="Variants">
            <Checkbox.Group>
              {editedVariants.map((variant, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <Input
                    value={variant.text}
                    onChange={(e) =>
                      handleVariantTextChange(index, e.target.value)
                    }
                  />
                  <Checkbox value={variant.text} id={variant._id}>
                    {variant.text}
                  </Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          </Form.Item>
        )}
        {question.type === "single" && (
          <Form.Item name="variants" label="Variants">
            <Radio.Group>
              {editedVariants.map((variant, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <Input
                    value={variant.text}
                    onChange={(e) =>
                      handleVariantTextChange(index, e.target.value)
                    }
                  />
                  <Radio value={variant.text}>Correct Question</Radio>
                </div>
              ))}
            </Radio.Group>
          </Form.Item>
        )}
        {question.type === "open" && (
          <Form.Item
            name="caseSensitive"
            valuePropName="checked"
            label="Case Sensitive"
          >
            <Checkbox />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default EditQuizQuestionModal;
