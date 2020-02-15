import React, {Component} from "react";
import {Layout} from "antd";
import Navbar from "../components/Navbar";
import MainContent from "./MainContent";
const {Footer} = Layout;

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <MainContent />
                <Footer style={{textAlign: "center"}}>
                    Developed by dNiesters
                </Footer>
            </div>
        );
    }
}
