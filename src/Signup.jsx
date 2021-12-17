import React, { useState, useEffect } from "react";
import { Input, Space, Button,message,Alert } from "antd";
import {useHistory} from "react-router-dom";

function Signup() {
  const div = {
    margin: "20px 400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItem: "center",
    backgroundColor: "white",
    minHeight: "500px",
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

  const [formInput, setFormInput] = useState({
    fname: "",
    lname: "",
    email: "",
    pwd: "",
  });

  let history = useHistory();

  function handleInputChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    const inputChange = { ...formInput };
    inputChange[name] = value;
    setFormInput(inputChange);
  }
  function handleSubmit() {
   if(formInput.fname && formInput.lname && formInput.email && formInput.pwd)
   {
    let config = {
      method: "POST",
      body: JSON.stringify({
        email: formInput.email,
        password: formInput.pwd,
        firstName: formInput.fname,
        lastName: formInput.lname,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch("https://task-management-rest-app.herokuapp.com/api/users", config)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        message.success({ content: 'Successfully Signup!', duration: 2}).then(history.push("./login"));
        setFormInput("");
      });
    }
    else message.error({content:'All Fields are Required', duration:2})
  }

  function handleReset(){ setFormInput("")};
  function handleBlur(event){
    let name = event.target.placeholder;
    let value = event.target.value;
    value=="" && message.error({content:`${name} Required`,duration:1})
  }

  return (
    <div style={div}>
      <Space direction="vertical">
        <Input
          style={text}
          name="fname"
          type="text"
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="First Name"
          value={formInput.fname}
        />
        <Input
          style={text}
          name="lname"
          type="text"
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Last Name"
          value={formInput.lname}
        />
        <Input
          style={text}
          name="email"
          type="email"
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Email"
          value={formInput.email}
        />
        <Input.Password
          name="pwd"
          style={text}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Password"
          value={formInput.pwd}
        />
        <Space direction="horizontal">
          <Button
            style={btn}
            type="primary"
            onClick={handleSubmit}
            value="default"
            htmlType="button"
          >
            Submit
          </Button>
          <Button style={btn} onClick={handleReset} type="primary" value="default" htmlType="reset">
            Reset
          </Button>
        </Space>
      </Space>
    </div>
  );
}

export default Signup;
