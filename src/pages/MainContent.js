import React, {Component} from "react";
import {Layout} from "antd";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Login from "../components/Login";
import Root from "../components/Root";
import RegisterFIR from "../components/RegisterFIR";
const {Content} = Layout;

export default class Main extends Component {
    render() {
        return (
            <Router>
                <Content style={{padding: "0 50px", marginTop: 64}}>
                    <div
                        style={{
                            background: "#fff",
                            padding: 24,
                            minHeight: 380
                        }}
                    >
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register-fir">
                                <RegisterFIR />
                            </Route>
                            <Route path="/">
                                <Root />
                            </Route>
                        </Switch>
                    </div>
                </Content>
            </Router>
        );
    }
}
