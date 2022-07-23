import React from 'react';
import { message, Row, Col } from 'antd';
import { Form, Input, SubmitButton, ResetButton } from 'formik-antd';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
	margin: 20px 200px;
`;

const ButtonWrap = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 100px;
`;

function Signup() {
	let history = useHistory();
	const initValues = {
		fname: undefined,
		lname: undefined,
		email: undefined,
		pwd: undefined,
		repwd: undefined,
	};

	const validate = yup.object({
		email: yup.string().required('Email Required').email('Invalid Email'),
		// pwd: yup.string().required().min(5, 'Too Short').max(50, 'Too Long'),
		fname: yup.string().required('First Name Required'),
		lname: yup.string().required('Last Name Required'),
		pwd: yup
			.string()
			.required('Password Required')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
				'Password Must Contain Minimum 8 characters, at least one letter, one number and one special character'
			),
		repwd: yup
			.string()
			.required('Please retype your password.')
			.oneOf([yup.ref('pwd')], 'Your passwords do not match.'),
	});

	function handleSubmit(values) {
		let config = {
			method: 'POST',
			body: JSON.stringify({
				email: values.email,
				password: values.pwd,
				firstName: values.fname,
				lastName: values.lname,
			}),
			headers: {
				'Content-type': 'application/json',
			},
		};
		fetch('https://task-management-rest-app.herokuapp.com/api/users', config)
			.then((res) => {
				if (res.ok) return res.json();
				else {
					message.error({
						content: 'Check Your Input Credentials',
						duration: 4,
					});
					return Promise.reject();
				}
			})
			.then((data) => {
				console.log(data);
				message
					.success({ content: 'Successfully Signup!', duration: 2 })
					.then(history.push('/login'));
			});
	}

	return (
		<Container>
			<Formik initialValues={initValues} onSubmit={handleSubmit} validationSchema={validate}>
				{(props) => (
					<div className="form">
						<Form
							style={{
								padding: '20px 130px',
								minHeight: '400px',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
						>
							<Row gutter={32}>
								<Col span={24}>
									<Form.Item name="fname" wrapperCol={24}>
										<Input
											placeholder="First Name*"
											name="fname"
											value={props.values.fname}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</Form.Item>
								</Col>
							</Row>

							<Row gutter={32}>
								<Col span={24}>
									<Form.Item name="lname" wrapperCol={24}>
										<Input
											placeholder="Last Name*"
											name="lname"
											value={props.values.lname}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</Form.Item>
								</Col>
							</Row>

							<Row gutter={32}>
								<Col span={24}>
									<Form.Item name="email" wrapperCol={24}>
										<Input
											placeholder="Email*"
											name="email"
											value={props.values.email}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</Form.Item>
								</Col>
							</Row>

							<Row gutter={32}>
								<Col span={24}>
									<Form.Item name="pwd" wrapperCol={24}>
										<Input.Password
											placeholder="Password*"
											name="pwd"
											value={props.values.pwd}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</Form.Item>
								</Col>
							</Row>

							<Row gutter={32}>
								<Col span={24}>
									<Form.Item name="repwd" wrapperCol={24}>
										<Input.Password
											placeholder="Confirm Password*"
											name="repwd"
											value={props.values.repwd}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</Form.Item>
								</Col>
							</Row>
							<ButtonWrap>
								<SubmitButton className="btn">Submit</SubmitButton>
								<ResetButton className="btn">Reset</ResetButton>
							</ButtonWrap>
						</Form>
					</div>
				)}
			</Formik>
		</Container>
	);
}

export default Signup;
