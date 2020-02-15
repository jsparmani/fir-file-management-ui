import React from "react";

import {Form, Input, Select, Button, InputNumber} from "antd";

const {Option} = Select;

class RegisterFIR extends React.Component {
    state = {
        confirmDirty: false,
        number: {
            value: 0
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
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

export default WrappedRegistrationForm;
