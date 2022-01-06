import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Popconfirm, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks } from "../redux/actionType";

function ReduxTaskList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(getTasks());
  }, [userInfo]);

  function handleDeleteClick(key) {
    dispatch(deleteTask(key));
  }

  function handleEdit(id) {
    history.push(`/taskredux/${id}`);
  }

  const Column = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        let text;
        if (priority === 1) text = "High";
        else if (priority === 2) text = "Medium";
        else text = "Low";
        return <>{text}</>;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        let text;
        if (type === 1) text = "Task";
        else if (type === 2) text = "Story";
        else text = "Bug";
        return <>{text}</>;
      },
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (label) => (
        <>
          {label.map((lb) => {
            let text;
            if (lb === 1) text = "Feature";
            else if (lb === 2) text = "Front-End";
            else if (lb === 3) text = "Change-Request";
            else text = "Back-End";
            return (
              <Tag color="magenta" key={lb}>
                {text}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "DueDate",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => {
        let dt = new Date(dueDate);
        let date;
        if (dt.getDate() < 10)
          date =
            "0" +
            dt.getDate() +
            "-" +
            (dt.getMonth() + 1) +
            "-" +
            dt.getFullYear();
        else
          date =
            dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
        return <>{date}</>;
      },
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => (
        <a href="#" onClick={() => handleEdit(record._id)}>
          Edit
        </a>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (text, record) => (
        <Popconfirm
          title="Sure to Delete?"
          onConfirm={() => handleDeleteClick(record._id)}
        >
          {" "}
          <a href="#">Delete</a>
        </Popconfirm>
      ),
    },
  ];

  let data = useSelector((state) => state.fetchdata);
  return (
    <Table dataSource={data} columns={Column} rowKey={(record) => record._id} />
  );
}

export default ReduxTaskList;
