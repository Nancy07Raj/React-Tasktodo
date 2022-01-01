import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom"
import { Popconfirm,Table, Tag, message } from "antd";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

function TaskSchedule() {
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  let config = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: userInfo.accessToken,
    },
  };
  useEffect(() => {
    const abortConst = new AbortController();
    fetch("https://task-management-rest-app.herokuapp.com/api/tasks", config,{signal: abortConst.signal})
      .then((res) => {
        if (!res.ok) {
          message.error("Server Error");
          return Promise.reject();
        } else return res.json();
      })
      .then((datas) => {
        setTableData(datas.data);
      });
      return()=> abortConst.abort();
  },[]);

  function handleDeleteClick(key){
  const deleteRecord = tableData.filter(data=> data._id !== key);
  setTableData(deleteRecord);
  let deleConfig ={
    method:'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Authorization' : userInfo.accessToken
    }
  };
  fetch(`https://task-management-rest-app.herokuapp.com/api/tasks/${key}`,deleConfig)
  .then(res =>{
    if(!res.ok)
    {
      message.error("Server Error");
      return Promise.reject();
    }
    else {
      message.success("Task Deleted");
   }
  })}

  function handleEdit(id){
     history.push(`/task/${id}`);
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
      render: (text,record) => <a href="#" onClick={()=>handleEdit(record._id)}>Edit</a>,
    },
    {
      title: "Delete",
      key: "delete",
      render: (text,record) =><Popconfirm title='Sure to Delete?' onConfirm={()=>handleDeleteClick(record._id)}> <a href="#">Delete</a></Popconfirm>,
    },
  ];

  return <Table dataSource={tableData} columns={Column} rowKey={(record)=>record._id} />
}

export default TaskSchedule;
