import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import {Link} from "react-router-dom";
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css'
const { Header, Content} = Layout;

function App(){
  return(
    <Layout className="layout">
    <Router>
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key='1'><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key='2'><Link to="/signup">Signup</Link></Menu.Item>
        <Menu.Item key='3'><Link to="/login">Login</Link></Menu.Item>
     </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </Content>
     </Router>
  </Layout>
)}

export default App;