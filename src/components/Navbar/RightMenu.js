import React, {Component} from "react";
import {Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../../actions";

class RightMenu extends Component {
    render() {
        return (
            <Menu mode={this.props.mode}>
                <Menu.Item key="login">
                    <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key="logout">
                    <Link
                        to="/"
                        onClick={() => {
                            this.props.logoutUser(this.props);
                        }}
                    >
                        Logout
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}
export default withRouter(connect(null, {logoutUser})(RightMenu));
