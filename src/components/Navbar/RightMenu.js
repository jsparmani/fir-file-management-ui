import React, {Component} from "react";
import {Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../../actions";

class RightMenu extends Component {
    render() {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="login">
                    <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key="logout">
                    <Link
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
