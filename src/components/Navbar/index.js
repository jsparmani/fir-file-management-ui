import React, {Component} from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import {Drawer, Button} from "antd";
import {HashRouter as Router} from "react-router-dom";

class Navbar extends Component {
    state = {
        current: "mail",
        visible: false
    };
    showDrawer = () => {
        this.setState({
            visible: true
        });
    };
    onClose = () => {
        this.setState({
            visible: false
        });
    };
    render() {
        return (
            <Router>
                <nav className="menuBar">
                    <div className="logo">
                        <a href="/#">File Tracking</a>
                    </div>
                    <div className="menuCon">
                        <div className="leftMenu">
                            <LeftMenu mode="horizontal" />
                        </div>
                        <div className="rightMenu">
                            <RightMenu mode="horizontal" />
                        </div>
                        <Button
                            className="barsMenu"
                            type="primary"
                            onClick={this.showDrawer}
                        >
                            <span className="barsBtn"></span>
                        </Button>
                        <Drawer
                            title="FIR File Tracking"
                            placement="right"
                            closable={true}
                            onClose={this.onClose}
                            visible={this.state.visible}
                            width="240px"
                        >
                            <LeftMenu mode="inline" />
                            <RightMenu mode="inline" />
                        </Drawer>
                    </div>
                </nav>
            </Router>
        );
    }
}
export default Navbar;
