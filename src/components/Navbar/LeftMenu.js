import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
class LeftMenu extends Component {
    render() {
        return (
            <div>
                <Menu mode={this.props.mode}>
                    <Menu.Item key="home">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="register_fir">
                        <Link to="/register-fir">Add FIR</Link>
                    </Menu.Item>
                    <Menu.Item key="status_fir">
                        <Link to="/status-fir">FIR Status</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
export default LeftMenu;
