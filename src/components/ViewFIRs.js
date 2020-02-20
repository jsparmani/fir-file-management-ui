import React, {Component} from "react";
import {List, Card, notification, Skeleton} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
axios.defaults.baseURL = "https://firfiletracking.pythonanywhere.com/api";

const openNotification = placement => {
    notification["error"]({
        message: "Error",
        description: "There seems to be some issue! Please try again",
        placement
    });
};

const compareFIRs = (a, b) => {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
};

const compareFIRStatus = (a, b) => {
    if (a.fir < b.fir) {
        return -1;
    }
    if (a.fir > b.fir) {
        return 1;
    }
    return 0;
};

class ViewFIRs extends Component {
    state = {
        firs: [],
        firStatus: [],
        finalArray: [],
        loading: true
    };

    fetchFIRs = () => {
        this.setState({loading: true});
        axios
            .get(`/tracking/firs/?ps=${this.props.ps}`)
            .then(res => {
                this.setState({firs: res.data}, () => {
                    this.state.firs.sort(compareFIRs);
                    console.log(this.state.firs);
                });
                axios
                    .get(`/tracking/fir-status/?ps=${this.props.ps}`)
                    .then(res => {
                        this.setState(
                            {firStatus: res.data, loading: false},
                            () => {
                                this.state.firStatus.sort(compareFIRStatus);
                                console.log(this.state.firStatus);
                            }
                        );
                    })
                    .catch(err => {
                        console.error(err);
                        openNotification("bottomRight");
                    });
            })
            .catch(err => {
                console.error(err);
                openNotification("bottomRight");
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
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 3,
                        xxl: 4
                    }}
                    dataSource={this.state.firs}
                    renderItem={(item, index) => (
                        <Link
                            to={{
                                pathname: "/detailed-status",
                                state: {fir_id: item.id}
                            }}
                        >
                            <List.Item>
                                <Card
                                    hoverable
                                    title={`${item.fir_no}-${item.police_station}`}
                                >
                                    <p>Accused Name: {item.accused_name}</p>
                                    <p>Accused Status: {item.accused_status}</p>
                                    <p>
                                        Current Status:{" "}
                                        {
                                            this.state.firStatus[index]
                                                .current_status
                                        }
                                    </p>
                                    <p>
                                        Location:{" "}
                                        {this.state.firStatus[index].location}
                                    </p>
                                    <p>
                                        Last Modified:{" "}
                                        {
                                            this.state.firStatus[index]
                                                .date_of_action
                                        }
                                    </p>
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

export default connect(mapStateToProps)(ViewFIRs);
