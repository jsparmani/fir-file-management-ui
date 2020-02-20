/* eslint-disable no-unused-expressions */
import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import {List, Card, Skeleton} from "antd";
import {Link} from "react-router-dom";

axios.defaults.baseURL = "https://firfiletracking.pythonanywhere.com/api";

class StatusFIR extends React.Component {
    state = {
        firs: [],
        loading: true
    };

    fetchFIRs = () => {
        this.setState({loading: true});
        axios.get(`/tracking/firs/?ps=${this.props.ps}`).then(res => {
            this.setState({firs: res.data, loading: false});
        });
    };

    componentDidMount() {
        this.fetchFIRs();
    }

    onFocus() {
        this.fetchFIRs();
    }

    render() {
        if (this.state.loading) {
            return <Skeleton active />;
        }

        return (
            <div>
                <h2 align="center">FIR Status</h2>

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
