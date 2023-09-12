import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import "../../../../css/course-details.css";

import { Button, Row, Col } from "antd"; // Import Button and layout components

function TextEditor({ setEditorHtml, editorHtml }) {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "link",
    "image",
    "align",
  ];

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <div>
      <ReactQuill
        value={editorHtml}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
      />
      <Row justify="center" style={{ marginTop: "20px" }}></Row>
    </div>
  );
}

export default TextEditor;
