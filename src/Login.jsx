import React from "react";
import { Input, Space,Button } from "antd";


function Login() {
  const div = {
    margin: "20px 400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
    backgroundColor: "white",
    minHeight: '400px'
  };
  const text = {
    width: "400px",
    margin: " 20px 30px",
    padding: "10px",
    border:'1px solid gray'
  };
  const btn ={
      width:'100px',
      alignItem:'center',
      margin:'20px 20px 0 70px'
  }


  return (
    <div style={div}>
      <Input style={text} type="email" placeholder="Email" />
        <Input.Password style={text} placeholder="input password" />
        <Space direction="horizontal">
        <Button style={btn} type="primary" value="default" htmlType="button">Submit </Button>
        <Button style={btn} type="primary" value="default" htmlType="reset">Reset </Button>
        </Space>
    </div>
  );

  
}

export default Login;
