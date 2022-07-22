import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col } from 'antd';
import {
	Form,
	Input,
	DatePicker,
	Checkbox,
	Radio,
	Select,
	SubmitButton,
	ResetButton,
} from 'formik-antd';
import * as yup from 'yup';
import '../TaskStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEditTask, PostTask, putTask } from '../redux/actionType';
import moment from 'moment';

const initValues = {
	title: undefined,
	description: undefined,
	dueDate: undefined,
	priority: undefined,
	type: undefined,
	label: undefined,
};

const Container = styled.div`
	margin-top: 20px;
	height: 100%;
`;

const Button = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0 300px;
	/* padding: 20px 0; */
`;

function TaskRedux(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [init, setInit] = useState(initValues);
	let { Id } = useParams();
	const [selectOption, setSelectOption] = useState('');
	const [date, setDate] = useState('');
	const today = new Date();
	let editData = useSelector((state) => state.editData);
	const userInfom = useSelector((state) => state.userInfom);

	if (props.Id) Id = props.Id;

	const validate = yup.object({
		title: yup.string().required('Title Required'),
		description: yup.string().required('Description Required'),
		dueDate: yup.date().min(today).required('DueDate greater than today'),
		priority: yup.number().required('Priority Required'),
		label: yup.array().min(1, 'Select atleast one Label'),
		type: yup.number().required('Type Required'),
	});

	let options = [
		{ label: 'Feature', value: 1 },
		{ label: 'Front-End', value: 2 },
		{ label: 'Change-Request', value: 3 },
		{ label: 'Back-End', value: 4 },
	];

	let selectOptions = [
		{ label: 'High', value: 1 },
		{ label: 'Medium', value: 2 },
		{ label: 'Low', value: 3 },
	];

	useEffect(() => {
		if (Id) {
			dispatch(getEditTask(Id));
			setInit(editData);
			const editDate = moment(editData.dueDate);
			setDate(editDate);
			setSelectOption(editData.priority);
		}
		return () => setInit(initValues);
	}, [Id, userInfom]);

	function handleSelectChange(selected) {
		setSelectOption(selected);
	}

	function handleSubmit(values, { resetForm }) {
		const PostData = {
			title: values.title,
			description: values.description,
			dueDate: values.dueDate,
			priority: values.priority,
			label: values.label,
			type: values.type,
		};
		if (Id) {
			dispatch(putTask(Id, PostData));
			setInit(initValues);
			// Id = Id.split('?')[0]; (remove query string)
			history.push('/taskredux');
		} else {
			dispatch(PostTask(PostData));
		}
		resetForm();
		setDate('');
		setSelectOption('');
	}

	return (
		<Container>
			<Formik
				enableReinitialize
				initialValues={init}
				onSubmit={handleSubmit}
				validationSchema={validate}
			>
				{(props) => (
					<Form
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							minHeight: '70vh',
							margin: '40px 80px',
							padding: '20px',
						}}
					>
						<Row>
							<Col span={24}>
								<Form.Item label="Title" name="title" labelCol={{ span: 4 }}>
									<Input
										id="title"
										type="text"
										name="title"
										onChange={props.handleChange}
									/>
								</Form.Item>
							</Col>
						</Row>

						<Row>
							<Col span={24}>
								<Form.Item
									label="Description"
									name="description"
									labelCol={{ span: 4 }}
									// wrapperCol={{ span: 24 }}
								>
									<Input.TextArea
										id="description"
										name="description"
										onChange={props.handleChange}
									/>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="dueDate"
									label="Due Date"
									labelCol={{ span: 8 }}
									wrapperCol={{ span: 12 }}
								>
									<DatePicker
										className="dueDate"
										onChange={(date) => setDate(date)}
										name="dueDate"
										value={date}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="priority"
									label="Priority"
									labelCol={{ span: 8 }}
									wrapperCol={{ span: 12 }}
								>
									<Select
										className="priority"
										name="priority"
										placeholder="Priority"
										onChange={(option) => {
											handleSelectChange(option);
										}}
										clearIcon
										options={selectOptions}
									></Select>
								</Form.Item>
							</Col>
						</Row>

						<Row>
							<Col span={12}>
								<Form.Item
									name="type"
									label="Type"
									labelCol={{ span: 8 }}
									wrapperCol={{ span: 16 }}
								>
									<Radio.Group
										className="type"
										values={props.values.type}
										onChange={props.handleChange}
										name="type"
									>
										<Radio value={1}>Task</Radio>
										<Radio value={2}>Story</Radio>
										<Radio value={3}>Bug</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="label"
									label="Label"
									labelCol={{ span: 8 }}
									wrapperCol={{ span: 16 }}
								>
									<Checkbox.Group
										style={{ display: 'flex', flexDirection: 'column' }}
										className="box"
										options={options}
										onChange={props.handleChange}
										name="label"
										checked={props.values.label}
									/>
								</Form.Item>
							</Col>
						</Row>

						<Button>
							<SubmitButton className="btn">Submit</SubmitButton>
							<ResetButton className="btn">Reset</ResetButton>
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
}

export default TaskRedux;
