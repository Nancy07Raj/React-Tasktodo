import React from "react";
import { Space, message } from "antd";
import { Form, Input, SubmitButton, ResetButton } from "formik-antd";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import "../Home.css";

function Signup() {
  let history = useHistory();
  const initValues = {
    fname: "",
    lname: "",
    email: "",
    pwd: "",
  };

  const validate = yup.object({
    email: yup.string().required("Required").email("Invalid Email"),
    pwd: yup.string().required().min(5, "Too Short").max(50, "Too Long"),
    fname: yup.string().required("Required"),
    lname: yup.string().required("Required"),
  });

  function handleSubmit(values) {
    let config = {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.pwd,
        firstName: values.fname,
        lastName: values.lname,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch("https://task-management-rest-app.herokuapp.com/api/users", config)
      .then((res) => {
        if (res.ok) return res.json();
        else {
          message.error({
            content: "Check Your Input Credentials",
            duration: 4,
          });
          return Promise.reject();
        }
      })
      .then((data) => {
        console.log(data);
        message
          .success({ content: "Successfully Signup!", duration: 2 })
          .then(history.push("/login"));
      });
  }

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={validate}
    >
      {(props) => (
        <div className="form">
          <Form>
            <Input
              placeholder="First Name"
              id="text"
              type="text"
              name="fname"
              value={props.values.fname}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            {props.touched.fname && props.errors.fname ? (
              <p className="red">{props.errors.fname}</p>
            ) : null}
            <Input
              placeholder="Last Name"
              type="text"
              name="lname"
              value={props.values.lname}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            {props.touched.lname && props.errors.lname ? (
              <p className="red">{props.errors.lname}</p>
            ) : null}
            <Input
              placeholder="Email ID"
              id="text"
              type="email"
              name="email"
              value={props.values.email}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            {props.touched.email && props.errors.email ? (
              <p className="red">{props.errors.email}</p>
            ) : null}
            <Input
              placeholder="Password"
              type="password"
              id="text"
              name="pwd"
              value={props.values.pwd}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            {props.touched.pwd && props.errors.pwd ? (
              <p className="red">{props.errors.pwd}</p>
            ) : null}
            <Space direction="horizontal">
              <SubmitButton className="btn">Submit</SubmitButton>
              <ResetButton className="btn">Reset</ResetButton>
            </Space>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Signup;
