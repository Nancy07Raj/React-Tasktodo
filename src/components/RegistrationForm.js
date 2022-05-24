import React from "react";
import { Formik } from "formik";
import { Row, Col } from "antd";
import { Form, Input, Radio, Select, DatePicker } from "formik-antd";
import * as yup from "yup";

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
  dob: yup.string().required("DOB required"),
  address: yup.string().required("Address Required"),
  gender: yup.number().required("Gender Required"),
  degree: yup.string().required("Degree required"),
});

export default function RegistrationForm() {
  return (
    <Formik
      initialValues={init}
      onSubmit={handleSubmit}
      validationSchema={validate}
    >
      <Form>
        <Row>
          <Col>
            <Form.Item name="name" label="Name">
              <Input name="name" type="text" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="email" label="Email">
              <Input name="email" type="text" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="phno" label="Phone No">
          <Input name="phno" type="text" />
        </Form.Item>
        <Form.Item name="dob" label="DOB">
          <DatePicker name="dob" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Radio.Group name="gender">
            <Radio value={1}>Male</Radio>
            <Radio value={2}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input name="address" type="text" />
        </Form.Item>
        <Form.Item name="degree" label="Degree">
          <Select
            style={{
              width: 120,
            }}
            name="degree"
            options={degreeOption}
          ></Select>
        </Form.Item>
      </Form>
    </Formik>
  );
}
