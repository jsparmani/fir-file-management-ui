import React, {Component} from "react";
import {Layout} from "antd";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "../components/Login";
import Root from "../components/Root";
import RegisterFIR from "../components/RegisterFIR";
import StatusFIR from "../components/StatusFIR";
import ChangeStatusFIR from "../components/ChangeStatusFIR";
import {connect} from "react-redux";
const {Content} = Layout;

const PrivateRoute = ({component: Component, authed, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            authed != null ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login"
                    }}
                />
            )
        }
    />
);

class Main extends Component {
    render() {
        return (
            <Router>
                <Content style={{padding: "0 50px", marginTop: 64}}>
                    <div
                        style={{
                            background: "#fff",
                            padding: 24,
                            minHeight: "75vh"
                        }}
                    >
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <PrivateRoute
                                path="/register-fir"
                                component={RegisterFIR}
                                authed={this.props.token}
                            />
                            <PrivateRoute
                                path="/status-fir"
                                component={StatusFIR}
                                authed={this.props.token}
                            />
                            <PrivateRoute
                                path="/change-status"
                                component={ChangeStatusFIR}
                                authed={this.props.token}
                            />
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

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(Main);
