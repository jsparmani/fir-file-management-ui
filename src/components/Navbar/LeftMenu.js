import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class LeftMenu extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Menu mode={this.props.mode}>
                    {this.props.routes.map(item => {
                        return (
                            <Menu.Item key={item.key}>
                                <Link to={item.to}>{item.display}</Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        routes: state.auth.leftRoutes
    };
};

export default connect(mapStateToProps)(LeftMenu);
