import React, {Component} from "react";
import {Menu, Icon} from "antd";
import {Link} from "react-router-dom";
class LeftMenu extends Component {
    render() {
        return (
            <div>
                <Menu mode="horizontal">
                    <Menu.Item key="home">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="register_fir">
                        <Link to="/register-fir">Add FIR</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
export default LeftMenu;
