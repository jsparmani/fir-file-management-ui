import React, {Component} from "react";
import {Menu, Icon} from "antd";
import {Link} from "react-router-dom";
class LeftMenu extends Component {
    render() {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="home">
                    <Link to="/">Home</Link>
                </Menu.Item>
            </Menu>
        );
    }
}
export default LeftMenu;
