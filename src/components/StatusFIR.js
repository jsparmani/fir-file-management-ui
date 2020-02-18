/* eslint-disable no-unused-expressions */
import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import {Typography, List, Card} from "antd";
import {Link, Redirect} from "react-router-dom";

const {Title} = Typography;

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

class StatusFIR extends React.Component {
    state = {
        firs: [],
        loading: false
    };

    fetchFIRs = () => {
        axios.get(`/tracking/firs/?ps=${this.props.ps}`).then(res => {
            this.setState({firs: res.data});
        });
    };

    componentDidMount() {
        this.fetchFIRs();
    }

    onFocus() {
        this.fetchFIRs();
    }

    sendRequest = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
        }, 2000);
    };

    render() {
        return (
            <div>
                <Title align="center">FIR Status</Title>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3
                    }}
                    dataSource={this.state.firs}
                    renderItem={item => (
                        <Link
                            to={{
                                pathname: "/change-status",
                                state: {fir_id: item.id, fir_no: item.fir_no}
                            }}
                        >
                            <List.Item>
                                <Card hoverable title={item.fir_no}>
                                    {item.accused_name}
                                </Card>
                            </List.Item>
                        </Link>
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ps: state.auth.ps_id
    };
};

export default connect(mapStateToProps)(StatusFIR);
