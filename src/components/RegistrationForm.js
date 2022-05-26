import React from "react";
import { Formik } from "formik";
import { Row, Col, Upload } from "antd";
import moment from "moment";
import {
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  SubmitButton,
} from "formik-antd";
import * as yup from "yup";
import { Debug } from "./Debug";

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const degreeOption = [
  { label: "MCA", value: "mca" },
  { label: "MSc", value: "msc" },
  { label: "MBA", value: "mba" },
];

const init = {
  name: undefined,
  email: undefined,
  phno: undefined,
  dob: undefined,
  address: undefined,
  gender: undefined,
  degree: undefined,
  excel: undefined,
};

const handleSubmit = (values, { resetForm, setSubmitting }) => {
  console.log(values);
  setSubmitting(false);
  resetForm();
};

const validate = yup.object({
  name: yup.string().required("Name Required"),
  email: yup.string().email("Invalid Email").required("Email Required"),
  phno: yup
    .string()
    .required("Phone no Required")
    .matches(phoneRegex, "Invalid number"),
  dob: yup
    .string()
    .required("DOB is Required")
    .test("DOB", "Please choose a valid date of birth", (value) => {
      return moment().diff(moment(value), "years") >= 18;
    }),
  address: yup.string().required("Address Required"),
  gender: yup.number().required("Gender Required"),
  degree: yup.string().required("Degree required"),
  excel: yup.array().required().label("Excel"),
});

// this dummy request is to override antd upload component action request
const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const handleupload = ({ file }, setFieldValue) => {
  console.log({ file });
  if (file.status === "uploading" || file.status === "done") {
    return setFieldValue("excel", [file]);
  }
  return setFieldValue("excel", []);
};

//while handling file formData used to send file value

// const handleSubmit = (values, { resetForm, setSubmitting }) => {
//   const formData = new FormData();
//   formData.append('fc', values.fc);
//   formData.append('brand', values?.brand);
//   formData.append('excel', values.excel[0]?.originFileObj);
//   formData.append('fileType', uploadType);
// }

export default function RegistrationForm() {
  return (
    <Formik
      initialValues={init}
      onSubmit={handleSubmit}
      validationSchema={validate}
    >
      {({ setFieldValue }) => {
        return (
          <Form>
            <Row gutter={16}>
              <Col sm={8}>
                <Form.Item
                  name="name"
                  label="Name"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Input name="name" type="text" />
                </Form.Item>
              </Col>
              <Col sm={8}>
                <Form.Item
                  name="email"
                  label="Email"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Input name="email" type="text" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col sm={8}>
                <Form.Item
                  name="dob"
                  label="DOB"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                >
                  <DatePicker name="dob" />
                </Form.Item>
              </Col>
              <Col sm={8}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Radio.Group name="gender">
                    <Radio value={1}>Male</Radio>
                    <Radio value={2}>Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col sm={8}>
                <Form.Item
                  name="address"
                  label="Address"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Input name="address" type="text" />
                </Form.Item>
              </Col>
              <Col sm={8}>
                <Form.Item
                  name="degree"
                  label="Degree"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Select
                    style={{
                      width: 120,
                    }}
                    name="degree"
                    options={degreeOption}
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col lg={16}>
                <Upload
                  name="excel"
                  customRequest={dummyRequest}
                  onChange={(e) => handleupload(e, setFieldValue)}
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                >
                  <button type="button">Click to Upload</button>
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                <Form.Item
                  name="phno"
                  label="Phone No"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Input name="phno" />
                </Form.Item>
              </Col>
              <Col>
                <SubmitButton>Submit</SubmitButton>
              </Col>
            </Row>
            <Debug />
          </Form>
        );
      }}
    </Formik>
  );
}
