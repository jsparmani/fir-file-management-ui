import React, {Component} from "react";
import {Layout} from "antd";
import Navbar from "../components/Navbar";
import MainContent from "./MainContent";
import {connect} from "react-redux";
import {logoutUser} from "../actions";
const {Footer} = Layout;

class Home extends Component {
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

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user_id: state.auth.user_id,
        ps_id: state.auth.ps_id,
        dist_id: state.auth.dist_id
    };
};

export default connect(mapStateToProps, {logoutUser})(Home);
