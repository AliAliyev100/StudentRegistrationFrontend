import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "antd";

import { useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/userAuthContext";
import { useFetch } from "../../../../hooks/useFetch";

import TextEditor from "../../Instructor/atoms/text-editor";

const CourseInformation = () => {
  const { courseId } = useParams();
  const createUrl = `http://localhost:8000/instructor/${courseId}/edit-content`;
  const getUrl = `http://localhost:8000/courses/${courseId}/get-content`;

  const { userToken, isLoggedIn, userRole } = useAuth();

  const [editorHtml, setEditorHtml] = useState("");
  const [editing, setEditing] = useState(false);

  const [options, setOptions] = useState({
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/json",
    },
    body: null,
  });

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      body: JSON.stringify({
        content: editorHtml,
      }),
      method: "POST",
    }));
  }, [editorHtml]);

  const { data, error, isLoading, fetchData } = useFetch(getUrl, options);

  useEffect(() => {
    fetchData(getUrl);
  }, []);

  useEffect(() => {
    if (data && data.content) {
      setEditorHtml(data.content);
    }
  }, [data]);

  const handleSave = () => {
    fetchData(createUrl);
    setEditing(false);
  };

  return (
    <div>
      <h3>Course details</h3>
      <div>
        {editing ? (
          userRole === "instructor" && (
            <div>
              <TextEditor
                setEditorHtml={setEditorHtml}
                editorHtml={editorHtml}
                setOptions={setOptions}
              />
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          )
        ) : (
          <div>
            {userRole === "instructor" && (
              <Button onClick={() => setEditing(true)}>Edit the content</Button>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: editorHtml }}
              style={{ padding: "30px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseInformation;
