import React from 'react';
import { Formik } from 'formik';
import { Form, Input, SubmitButton, ResetButton } from 'formik-antd';
import * as Yup from 'yup';
import { message, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actionType';
import '../Home.css';
import '../TaskStyle.css';

function Login() {
	const dispatch = useDispatch();
	let history = useHistory();

	const initialValues = {
		email: undefined,
		pwd: undefined,
	};
	const validateSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email Required')
			.email('Invalid Email')
			.matches(
				/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
				'Invalid Email'
			),
		pwd: Yup.string().required('Password Required'),
	});

	function onSubmit(values) {
		const userData = {
			email: values.email,
			password: values.pwd,
		};
		dispatch(login(userData));
		message.success({ content: 'Logged In', duration: 2 });
		history.push('/taskredux');
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateSchema}>
			{(props) => (
				<Form
					style={{
						height: '100%',
						margin: '40px 80px',
						padding: '20px 0',
					}}
				>
					<Row>
						<Col span={24}>
							<Form.Item
								name="email"
								label="Email"
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 12 }}
							>
								<Input
									type="email"
									placeholder="Email"
									name="email"
									value={props.values.email}
									onChange={props.handleChange}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row>
						<Col span={24}>
							<Form.Item
								name="pwd"
								label="Password"
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 12 }}
							>
								<Input
									type="password"
									placeholder="Password"
									name="pwd"
									size="small"
									onChange={props.handleChange}
								/>
							</Form.Item>
						</Col>
					</Row>

					<div className="div-btn">
						<SubmitButton className="btn">Submit</SubmitButton>
						<ResetButton className="btn">Reset</ResetButton>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default Login;
