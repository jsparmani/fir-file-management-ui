import React, {Component} from "react";
import {Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../../actions";

class RightMenu extends Component {
    render() {
        return (
            <Menu mode={this.props.mode}>
                {this.props.routes.map(item => {
                    if (item.key === "logout") {
                        return (
                            <Menu.Item key={item.key}>
                                <Link
                                    to={item.to}
                                    onClick={event => {
                                        event.preventDefault();
                                        this.props.logoutUser(this.props);
                                    }}
                                >
                                    {item.display}
                                </Link>
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.to}>{item.display}</Link>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    }
}

const mapStateToProps = state => {
    return {
        routes: state.auth.rightRoutes
    };
};

export default withRouter(connect(mapStateToProps, {logoutUser})(RightMenu));
