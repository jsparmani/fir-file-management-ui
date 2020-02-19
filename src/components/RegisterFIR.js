import React from "react";

import {
    Form,
    Input,
    Select,
    Button,
    InputNumber,
    DatePicker,
    message
} from "antd";

import axios from "axios";

import {connect} from "react-redux";

const {Option} = Select;

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
class RegisterFIR extends React.Component {
    state = {
        confirmDirty: false,
        number: {
            value: 0
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        let self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // message.loading("In Progress..", 2.5);
                axios
                    .post("/tracking/firs/", {
                        fir_no: values.fir_no,
                        police_station: self.props.ps,
                        investigation_officer: values.investigation_officer,
                        accused_name: values.accused_name,
                        accused_status: values.accused_status,
                        challan_to_court_limitation_period:
                            values.challan_to_court_limitation_period
                    })
                    .then(res => {
                        if (values.date) {
                            axios
                                .post("/tracking/fir-status/", {
                                    fir: res.data.id,
                                    current_status: values.current_status,
                                    location: values.current_location,
                                    date_of_action: values.date.format(
                                        "YYYY-MM-DD"
                                    ),
                                    is_active: true
                                })
                                .then(res => {
                                    message.success(
                                        "Successfully Registered..",
                                        2.5
                                    );
                                })
                                .catch(err => {
                                    console.error(err);
                                    message.error(
                                        "There seems to be some issue! Please try again",
                                        2.5
                                    );
                                });
                        } else {
                            let current_datetime = new Date();
                            axios
                                .post("/tracking/fir-status/", {
                                    fir: res.data.id,
                                    current_status: values.current_status,
                                    location: values.current_location,
                                    date_of_action:
                                        current_datetime.getFullYear() +
                                        "-" +
                                        (current_datetime.getMonth() + 1) +
                                        "-" +
                                        current_datetime.getDate(),
                                    is_active: true
                                })
                                .then(res => {
                                    message.success(
                                        "Successfully Registered..",
                                        2.5
                                    );
                                })
                                .catch(err => {
                                    console.error(err);
                                    message.error(
                                        "There seems to be some issue! Please try again",
                                        2.5
                                    );
                                });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        message.error(
                            "There seems to be some issue! Please try again",
                            2.5
                        );
                    });
            }
        });
    };

    handleNumberChange = value => {
        this.setState({
            number: {
                value
            }
        });
    };

    renderDate = getFieldDecorator => {
        if (
            this.props.form.getFieldValue("current_status") !==
            "under_investigation"
        ) {
            return (
                <Form.Item label="Select Date">
                    {getFieldDecorator("date", {
                        rules: [
                            {
                                required: false,
                                message: "Please select the date!"
                            }
                        ]
                    })(<DatePicker placeholder="Select Date" />)}
                </Form.Item>
            );
        }
    };

    render() {
        const {number} = this.state;
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
                lg: {span: 10}
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                },
                lg: {span: 10, offset: 12}
            }
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="FIR No.">
                    {getFieldDecorator("fir_no", {
                        rules: [
                            {
                                required: true,
                                message: "Please input the FIR Number!"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Investigation Officer">
                    {getFieldDecorator("investigation_officer", {
                        rules: [
                            {
                                required: true,
                                message:
                                    "Please enter the Investigation Officer Name!"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Accused Name">
                    {getFieldDecorator("accused_name", {
                        rules: [
                            {
                                required: true,
                                message: "Please enter the Accused Name"
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Accused Status">
                    {getFieldDecorator("accused_status", {
                        rules: [
                            {
                                required: true,
                                message: "Please select accused status!"
                            }
                        ]
                    })(
                        <Select
                            showSearch
                            placeholder="Select accused status"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="arrested">Arrested</Option>
                            <Option value="not_arrested">Not Arrested</Option>
                            <Option value="po">PO</Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item label="Court Limitation Period">
                    {getFieldDecorator("challan_to_court_limitation_period", {
                        rules: [
                            {
                                required: true,
                                type: "number",
                                message: "Please enter the number of days"
                            }
                        ]
                    })(
                        <InputNumber
                            min={0}
                            max={365}
                            value={number.value}
                            onChange={this.handleNumberChange}
                        />
                    )}
                </Form.Item>

                <Form.Item label="Current Status">
                    {getFieldDecorator("current_status", {
                        rules: [
                            {
                                required: true,
                                message: "Please select current status!"
                            }
                        ]
                    })(
                        <Select
                            showSearch
                            placeholder="Select current status"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="under_investigation">
                                Under Investigation
                            </Option>
                            <Option value="challan_filed">Challan Filed</Option>
                            <Option value="untraced">Untraced</Option>
                            <Option value="cancelled">Cancelled</Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item label="Current Location of FIR">
                    {getFieldDecorator("current_location", {
                        rules: [
                            {
                                required: false,
                                message: "Please select current status!"
                            }
                        ]
                    })(
                        <Select
                            showSearch
                            placeholder="Select current location of FIR"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="ps">Police Station</Option>
                            <Option value="dsp">DSP Office</Option>
                            <Option value="sp">SP Office</Option>
                            <Option value="ssp">SSP Office</Option>
                            <Option value="court">Court</Option>
                        </Select>
                    )}
                </Form.Item>

                {this.renderDate(getFieldDecorator)}

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({name: "register"})(RegisterFIR);

const mapStateToProps = state => {
    return {
        ps: state.auth.ps_id
    };
};

export default connect(mapStateToProps)(WrappedRegistrationForm);
