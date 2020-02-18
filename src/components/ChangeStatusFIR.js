import React from "react";
import {Form, Input, Select, Button, InputNumber, DatePicker} from "antd";
import axios from "axios";
import {connect} from "react-redux";

const {Option} = Select;

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
class ChangeStatusFIR extends React.Component {
    state = {
        confirmDirty: false
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values, this.props.location.state.fir_id);
                axios
                    .post("/tracking/fir-status/", {
                        fir: this.props.location.state.fir_id,
                        current_status: values.current_status,
                        location: values.current_location,
                        date_of_action: values.date.format("YYYY-MM-DD"),
                        is_active: true
                    })
                    .then(res => console.log(res.data));
            }
        });
    };

    render() {
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
                        initialValue: this.props.location.state.fir_no,
                        rules: [
                            {
                                required: true,
                                message: "Please input the FIR Number!"
                            }
                        ]
                    })(<Input disabled />)}
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

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({name: "change-status"})(
    ChangeStatusFIR
);

const mapStateToProps = state => {
    return {
        ps: state.auth.ps_id
    };
};

export default connect(mapStateToProps)(WrappedRegistrationForm);
