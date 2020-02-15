import React, {Component} from "react";
import {Menu, Icon} from "antd";
import {Link} from "react-router-dom";
class RightMenu extends Component {
    render() {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="login">
                    <Link to="/login">Login</Link>
                </Menu.Item>
            </Menu>
        );
    }
}
export default RightMenu;
