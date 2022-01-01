import React from "react";
import { Formik } from "formik";
import { Form, Input, SubmitButton, ResetButton } from "formik-antd";
import * as Yup from "yup";
import { Space, message } from "antd";
import { useHistory } from "react-router-dom";
import "../Home.css";

function Login() {
  let history = useHistory();

  const initialValues = {
    email: "",
    pwd: "",
  };
  const validateSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Invalid Email"),
    pwd: Yup.string().required("Required"),
  });

  function onSubmit(values) {
    let config = {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.pwd,
      }),
      headers: { "content-type": "application/json" },
    };
    fetch(
      "https://task-management-rest-app.herokuapp.com/api/users/login",
      config
    )
      .then((res) => res.json())
      .then((output) => {
        console.log(output);
        let userData = {
          accessToken: output.data.accessToken,
          firstName: output.data.firstName,
          lastName: output.data.lastName,
          email: output.data.email,
        };
        localStorage.setItem("userInfo", JSON.stringify(userData));
        message.success({ content: "Logged In", duration: 2 });
        history.push("/task");
        window.location.reload(true);
      });
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
    >
      {(props) => (
        <div className="form">
          <Form>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={props.values.email}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            validate={props.errors.email?"error":"success"}
          />
          {props.touched.email && props.errors.email ? <div className="red">{props.errors.email}</div>:null}
          <Input.Password
            placeholder="Password"
            name="pwd"
            value={props.values.pwd}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          {props.touched.pwd && props.errors.pwd ? <div className="red">{props.errors.pwd}</div>:null}
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

export default Login;
