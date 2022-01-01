import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useParams, useHistory } from "react-router-dom";
import {
  Form,
  Input,
  DatePicker,
  Checkbox,
  Radio,
  Select,
  SubmitButton,
  ResetButton,
} from "formik-antd";
import { message, Space } from "antd";
import * as yup from "yup";
import "../TaskStyle.css";

const initValues = {
  title: "",
  des: "",
  dueDate: "",
  priority: "",
  type: "",
  label: "",
};

function Task() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [init, setInit] = useState(initValues);
  const { Id } = useParams();
  const [selectOption, setSelectOption] = useState(null);
  const [date, setDate] = useState(null);
  const today = new Date();
  const history = useHistory();

  const validate = yup.object({
    title: yup.string().required("Required"),
    des: yup.string().required("Required"),
    dueDate: yup.date().min(today).required("DueDate greater than today"),
    priority: yup.number().required("Priority Required"),
    label: yup.array().min(1, "Select atleast one Label"),
    type: yup.number().required("Type Required"),
  });
  console.log(Id);

  useEffect(() => {
    if (Id) {
      let config = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: userInfo.accessToken,
        },
      };
      fetch(
        `https://task-management-rest-app.herokuapp.com/api/tasks/${Id}`,
        config
      )
        .then((res) => {
          if (!res.ok) {
            return Promise.reject();
          } else return res.json();
        })
        .then((datas) => {
          setInit({
            title: datas.data.title,
            des: datas.data.description,
            dueDate: datas.data.dueDate,
            priority: datas.data.priority,
            type: datas.data.type,
            label: datas.data.label,
          });
        });
    }
    return () => setInit(initValues);
  }, [Id]);
  console.log(init);

  let options = [
    { label: "Feature", value: 1 },
    { label: "Front-End", value: 2 },
    { label: "Change-Request", value: 3 },
    { label: "Back-End", value: 4 },
  ];

  let selectOptions = [
    { label: "High", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Low", value: 3 },
  ];

  function handleSelectChange(selected) {
    setSelectOption(selected);
  }

  function handleSubmit(values, { resetForm }) {
    if (Id) {
      let editConfig = {
        method: "PUT",
        body: JSON.stringify({
          title: values.title,
          description: values.des,
          dueDate: values.dueDate,
          priority: values.priority,
          label: values.label,
          type: values.type,
        }),
        headers: {
          "Content-type": "application/json",
          Authorization: userInfo.accessToken,
        },
      };
      fetch(
        `https://task-management-rest-app.herokuapp.com/api/tasks/${Id}`,
        editConfig
      )
        .then((res) => {
          if (!res.ok) {
            return Promise.reject();
          } else return res.json();
        })
        .then((data) => {
          message.success("Task Updated");
          resetForm();
          setDate(null);
          setSelectOption(null);
          setInit(initValues);
          history.push("/task/:Id");
        });
    } else {
      let Pconfig = {
        method: "POST",
        body: JSON.stringify({
          title: values.title,
          description: values.des,
          dueDate: values.dueDate,
          priority: values.priority,
          label: values.label,
          type: values.type,
        }),
        headers: {
          "content-type": "application/json",
          Authorization: userInfo.accessToken,
        },
      };
      fetch("https://task-management-rest-app.herokuapp.com/api/tasks", Pconfig)
        .then((res) => {
          if (!res.ok) {
            message.error({ content: "Server Error", duration: 4 });
            return Promise.reject();
          } else return res.json();
        })
        .then((data) => {
          message.success("Task Created");
          resetForm();
          setDate(null);
          setSelectOption(null);
        });
    }
  }
  return (
    <Formik
      enableReinitialize
      initialValues={init}
      onSubmit={handleSubmit}
      validationSchema={validate}
    >
      {(props) => (
        <div className="div">
          <Form>
            <Space direction="vertical">
              <Input
                id="title"
                type="text"
                name="title"
                value={props.values.title}
                onBlur={props.handleBlur}
                onChange={props.handleChange}
              />
              {props.touched.title && props.errors.title ? (
                <p style={{ color: "red" }}>{props.errors.title}</p>
              ) : null}
              <Input.TextArea
                id="des"
                name="des"
                value={props.values.des}
                onBlur={props.handleBlur}
                onChange={props.handleChange}
              />
              {props.touched.des && props.errors.des ? (
                <p style={{ color: "red" }}>{props.errors.des}</p>
              ) : null}
              <Space direction="horizontal">
                <DatePicker
                  className="dueDate"
                  onChange={(date) => setDate(date)}
                  onBlur={props.handleBlur}
                  name="dueDate"
                  value={date}
                />
                {props.touched.dueDate && props.errors.dueDate ? (
                  <p style={{ color: "red" }}>{props.errors.dueDate}</p>
                ) : null}
                <Radio.Group
                  className="type"
                  values={props.values.type}
                  onChange={props.handleChange}
                  name="type"
                >
                  <Radio value={1}>Task</Radio>
                  <Radio value={2}>Story</Radio>
                  <Radio value={3}>Bug</Radio>
                </Radio.Group>
                {props.touched.type && props.errors.type ? (
                  <p style={{ color: "red" }}>{props.errors.type}</p>
                ) : null}
              </Space>
              <Space direction="horizontal">
                <Select
                  className="priority"
                  name="priority"
                  placeholder="Priority"
                  onBlur={props.handleBlur}
                  value={selectOption}
                  onChange={(option) => {
                    handleSelectChange(option);
                  }}
                  clearIcon
                  options={selectOptions}
                ></Select>
                {props.touched.priority && props.errors.priority ? (
                  <p style={{ color: "red" }}>{props.errors.priority}</p>
                ) : null}
                <Checkbox.Group
                  className="box"
                  options={options}
                  onChange={props.handleChange}
                  name="label"
                  checked={props.values.label}
                />
                {props.touched.label && props.errors.label ? (
                  <p style={{ color: "red" }}>{props.errors.label}</p>
                ) : null}
              </Space>
              <Space direction="horizontal">
                <SubmitButton className="btn">Submit</SubmitButton>
                <ResetButton className="btn">Reset</ResetButton>
              </Space>
            </Space>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Task;
