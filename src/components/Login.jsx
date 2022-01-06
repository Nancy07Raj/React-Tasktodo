import React from "react";
import { Formik } from "formik";
import { Form, Input, SubmitButton, ResetButton } from "formik-antd";
import * as Yup from "yup";
import { Space, message } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/actionType";
import "../Home.css";

function Login() {
  const dispatch = useDispatch();
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
    const userData ={
      email: values.email,
      password: values.pwd
    }
    dispatch(login(userData));
    message.success({ content: "Logged In", duration: 2 });
    history.push('/taskredux');
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
    >
      {(props) => (
        <div className="form">
          <Form className="form">
          <Input
            type="email"
            id="text"
            placeholder="Email"
            name="email"
            value={props.values.email}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            validate={props.errors.email?"error":"success"}
          />
          {props.touched.email && props.errors.email ? <div className="red">{props.errors.email}</div>:null}
          <Input
            type='password'
            placeholder="Password"
            id='pwd'
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
