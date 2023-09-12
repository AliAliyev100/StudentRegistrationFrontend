import { React, useState, useEffect } from "react";
import { Card, List, Modal, Button, Form, Input } from "antd";
import { NewAnnouncementForm } from "../../atoms/new-announcement-form";
import { useAuth } from "../../../../contexts/userAuthContext";
import { useFetch } from "../../../../hooks/useFetch";
import { useWindowWidth } from "../../../../hooks/useWindowWidth";

import { useParams } from "react-router-dom";
const { Meta } = Card;

const AnnouncementsComponent = () => {
  const { courseId } = useParams();
  const width = useWindowWidth();

  const createUrl = `http://localhost:8000/instructor/${courseId}/create-announcement`;
  const getUrl = `http://localhost:8000/courses/${courseId}/announcements`;

  const { userToken, isLoggedIn, userRole } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValues, setModalValues] = useState({
    title: "",
    content: "",
  });
  const [dataSource, setDataSource] = useState([]);

  const handleInputChange = (name, value) => {
    setModalValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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
        title: modalValues.title,
        content: modalValues.content,
      }),
      method: "POST",
    }));
  }, [JSON.stringify(modalValues)]);

  const handleCreate = () => {
    fetchData();
    handleCancel();
    dataSource.unshift({
      title: modalValues.title,
      content: modalValues.content,
      createdAt: new Date().toISOString().slice(0, 10),
    });
  };
  const { data, error, isLoading, fetchData } = useFetch(createUrl, options);

  useEffect(() => {
    fetchData(getUrl);
  }, []);

  useEffect(() => {
    if (data && data.announcements) {
      data.announcements.forEach((announcement) => {
        setDataSource((prevDataSource) => [announcement, ...prevDataSource]);
      });
    }
  }, [data]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {width > 650 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Announcements</h3>
          {userRole === "Instructor" && (
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Create a new Announcement
            </Button>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Announcements</h3>
          {userRole === "Instructor" && (
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Create a new Announcement
            </Button>
          )}
        </div>
      )}

      <List
        grid={{
          gutter: 16,
          column: 1,
        }}
        style={{ marginTop: "3rem" }}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <Card>
              <Meta
                title={item.title}
                description={`Posted on: ${item.createdAt}`}
              />
              <hr />
              <p>{item.content}</p>
            </Card>
          </List.Item>
        )}
      />
      {userRole === "Instructor" && (
        <NewAnnouncementForm
          visible={isModalVisible}
          onCreate={handleCreate}
          onCancel={handleCancel}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default AnnouncementsComponent;
