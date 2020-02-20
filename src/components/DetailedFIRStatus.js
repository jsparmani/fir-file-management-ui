import React, {Component} from "react";

import {Steps, Skeleton, notification} from "antd";

import axios from "axios";
import {connect} from "react-redux";

const {Step} = Steps;

axios.defaults.baseURL = "https://firfiletracking.pythonanywhere.com/api";

const openNotification = placement => {
    notification["error"]({
        message: "Error",
        description: "There seems to be some issue! Please try again",
        placement
    });
};

const compareStatus = (a, b) => {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
};

class DetailedFIRStatus extends Component {
    state = {
        statusList: [],
        loading: true
    };

    fetchStatus = () => {
        this.setState({loading: true});
        axios
            .get(
                `/tracking/fir-status-all/?ps=${this.props.ps}&fir=${this.props.location.state.fir_id}`
            )
            .then(res => {
                this.setState({statusList: res.data, loading: false}, () => {
                    this.state.statusList.sort(compareStatus);
                    console.log(this.state.statusList);
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({loading: false});
                openNotification("bottomRight");
            });
    };

    componentDidMount() {
        this.fetchStatus();
    }

    onFocus() {
        this.fetchStatus();
    }

    render() {
        if (this.state.loading) {
            return <Skeleton active />;
        }

        return (
            <Steps direction="vertical" current={1}>
                {this.state.statusList.map((item, index) => {
                    if (index === this.state.statusList.length - 1) {
                        return (
                            <Step
                                title={item.location}
                                description={`${item.current_status}------${item.date_of_action}`}
                                status="finish"
                            />
                        );
                    }
                    return (
                        <Step
                            title={item.location}
                            description={`${item.current_status}------${item.date_of_action}`}
                            status="process"
                        />
                    );
                })}
                {/* <Step title="Finished" description="This is a description." />
                <Step
                    title="In Progress"
                    description="This is a description."
                />
                <Step title="Waiting" description="This is a description." /> */}
            </Steps>
        );
    }
}

const mapStateToProps = state => {
    return {
        ps: state.auth.ps_id
    };
};

export default connect(mapStateToProps)(DetailedFIRStatus);
