import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Link} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import TaskHome from "./TaskHome";
import Task from "./Task";
import Logout from "./Logout";
import TaskSchedule from "./TaskSchedule";
import ReactTable from "./ReactTable";
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css'
const { Header, Content} = Layout;
const userInfo = JSON.parse(localStorage.getItem('userInfo'))

function App(){

     return(
       <Layout className="layout">
       <Router>
       <Header>
       {!userInfo?.accessToken ?
       <Menu theme="dark" mode="horizontal">      
        <Menu.Item key='1'><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key='2'><Link to="/signup">Signup</Link></Menu.Item>
        <Menu.Item key='3'><Link to="/login">login</Link></Menu.Item>
        </Menu> :
        <Menu theme="dark" mode="horizontal">
        <Menu.Item key='4'><Link  to="/taskhome">Home</Link></Menu.Item>
        <Menu.Item key='5'><Link to="/task">Task</Link></Menu.Item>
        <Menu.Item key='6'><Link to="/taskschedule">TaskSchedule</Link></Menu.Item>
        <Menu.Item key='7'><Link to="/logout">Logout</Link></Menu.Item>
        <Menu.Item key='8'><Link to="/reacttable">React-Table</Link></Menu.Item>
       </Menu>}
       </Header>
        <Content style={{ padding: '0 50px' }}>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/taskhome" component={TaskHome} />
        <Route path="/task/:Id?" component={Task} />
        <Route path="/taskschedule" component={TaskSchedule} />
        <Route path="/logout" component={Logout} />
        <Route path="/reacttable" component={ReactTable} />
      </Switch>
      </Content>
      </Router>
      </Layout>
    )}

export default App;