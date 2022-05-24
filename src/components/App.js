import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import TaskHome from "./TaskHome";
import Logout from "./Logout";
import TaskRedux from "./TaskRedux";
import ReduxTaskList from "./ReduxTaskList";
import ReactTable from "./ReactTable";
import RegistrationForm from "./RegistrationForm";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
const { Header, Content } = Layout;

function App() {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <Layout className="layout">
      <Router>
        <Header>
          {userInfo === "" ? (
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/signup">Signup</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/login">login</Link>
              </Menu.Item>
            </Menu>
          ) : (
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="4">
                <Link to="/taskhome">Home</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/taskredux">Task</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/tasklistredux">TaskList</Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/reacttable">React-Table</Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link to="/regform">RegistrationForm</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/logout">Logout</Link>
              </Menu.Item>
            </Menu>
          )}
        </Header>
        <Content style={{ padding: "0 100px", minHeight: "100%" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/taskhome" component={TaskHome} />
            <Route path="/logout" component={Logout} />
            <Route path="/reacttable" component={ReactTable} />
            <Route path="/taskredux/:Id?" component={TaskRedux} />
            <Route path="/tasklistredux" component={ReduxTaskList} />
            <Route path="/regform" component={RegistrationForm} />
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
