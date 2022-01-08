import axios from "axios";
import { message } from "antd";
import store from "./store";

// const accessToken = store.getState().userInfo.accessToken;
const userInfo = JSON.parse(localStorage.getItem('userInfo'))

let config = {
  headers: {
    "Content-type": "application/json",
    Authorization: userInfo.accessToken,
  },
};

const loginconfig = { headers: { "Content-type": "application/json" } };

export const login = (data) => {
  return (dispatch) => {
    axios
      .post(
        "https://task-management-rest-app.herokuapp.com/api/users/login",
        JSON.stringify(data),
        loginconfig
      )
      .then((res) => {
        console.log(store.getState().userInfo);
        localStorage.setItem('userInfo',JSON.stringify(res.data.data));
        dispatch(userInfo(res.data.data));
        message.success({ content: "Logged In", duration: 2 });
      })
      .catch((err) => console.log(err));
  };
};

export const getTasks = () => {
  return (dispatch) => {
    axios
      .get("https://task-management-rest-app.herokuapp.com/api/tasks", config)
      .then((res) => {
        dispatch(fetchTasks(res.data.data));
      })
      .catch((err) => console.log(err));
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    axios
      .delete(
        `https://task-management-rest-app.herokuapp.com/api/tasks/${id}`,
        config
      )
      .then((res) => dispatch(getTasks()))
      .catch((err) => console.log(err));
  };
};

export const getEditTask = (id) => {
  return (dispatch) => {
    axios
      .get(
        `https://task-management-rest-app.herokuapp.com/api/tasks/${id}`,
        config
      )
      .then((res) =>
        dispatch({ type: "Get_Edit_Data", payload: res.data.data })
      )
      .catch((err) => console.log(err));
  };
};

export const putTask = (id, data) => {
  return (dispatch) => {
    axios
      .put(
        `https://task-management-rest-app.herokuapp.com/api/tasks/${id}`,
        JSON.stringify(data),
        config
      )
      .then((res) => {
        dispatch({ type: "Put_Task" });
        message.success({ content: "Tasks Updated", duration: 2 });
      })
      .catch((err) => console.log(err));
  };
};

export const fetchTasks = (data) => {
  return {
    type: "Fetch_Tasks",
    payload: data,
  };
};

export const getPostData = (data) => {
  return {
    type: "Get_Post_Data",
    payload: data,
  };
};

export const logout = () => {
  return {
    type: "Logout",
  };
};

export const userInfo = (data) => {
  return {
    type: "User_Info",
    payload: data,
  };
};

export const PostTask = (Data) => {
  return (dispatch) => {
    axios
      .post(
        "https://task-management-rest-app.herokuapp.com/api/tasks",
        JSON.stringify(Data),
        config
      )
      .then((res) => {
        dispatch(getPostData(Data));
        message.success({ content: "Task Created", duration: 2 });
      })
      .catch((err) => console.log(err));
  };
};
