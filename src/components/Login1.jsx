import React from "react";
import { Form, Input, SubmitButton, ResetButton} from 'formik-antd'
import {Formik} from "formik";
import * as yup from "yup";


function Login() {

  const div = {
    margin: "20px 400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    minHeight: "400px",
  };
  const text = {
    width: "400px",
    margin: " 20px 30px",
    padding: "10px",
    border: "1px solid gray",
  };
  const btn = {
    width: "100px",
    alignItem: "center",
    margin: "20px 20px 0 70px",
  };
  const err ={
    color: "red"
  }
  
  return(<Formik
    initialValues={{email:"",pwd:""}}
    onSubmit= {values =>{console.log(values)}}
    validationSchema= {yup.object().shape({
      email: yup.string().email("Invalid EMAIL").required("Required"),
      pwd: yup.string().required("Requried")
    })}>
    {(props) =>(
    <Form style={div} onSubmit={props.handleSubmit} >
      <Input type="email" style={text} name="email" value={props.values.email} onChange={props.handleChange} onBlur={props.handleBlur} />
      {props.touched.email || props.errors.fname ? <div style={err}>{props.errors.email}</div> : null}
      <Input.Password style={text} name="pwd" value={props.values.pwd} onChange={props.handleChange} onBlur={props.handleBlur}/>
      {props.touched.pwd || props.errors.pwd ? <div style={err}>{props.errors.pwd}</div> : null}
      <SubmitButton  style={btn}>Submit</SubmitButton>
      <ResetButton style={btn}>Reset</ResetButton>
    </Form>
    )}

    </Formik>)

}

export default Login;
