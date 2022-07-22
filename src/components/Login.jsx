import React from 'react';
import { Formik } from 'formik';
import { Form, Input, SubmitButton, ResetButton } from 'formik-antd';
import * as Yup from 'yup';
import { message, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actionType';
import styled from 'styled-components';
import '../TaskStyle.css';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 50px 0;
`;

const ButtonContainer = styled.div`
	display: flex;
	margin: 30px 100px;
	justify-content: space-between;
`;

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
						display: 'flex',
						width: '600px',
						margin: '40px 250px',
						padding: '20px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Container>
						<Row gutter={[32, 32]} justifyContent="space-between">
							<Col span={24}>
								<Form.Item name="email">
									<Input
										placeholder="Email"
										name="email"
										value={props.values.email}
										onChange={props.handleChange}
									/>
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item name="pwd">
									<Input
										placeholder="Password"
										name="pwd"
										onChange={props.handleChange}
									/>
								</Form.Item>
							</Col>
						</Row>

						<ButtonContainer>
							<SubmitButton>Submit</SubmitButton>
							<ResetButton>Reset</ResetButton>
						</ButtonContainer>
					</Container>
				</Form>
			)}
		</Formik>
	);
}

export default Login;
