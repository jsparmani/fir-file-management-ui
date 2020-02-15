import React from "react";
import {Form, Icon, Input, Button} from "antd";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post("/user/token/", values).then(res => {
                    console.log(res.data);
                });
            }
        });
    };

    onChange = e => {
        this.props.form.setFieldsValue({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your email!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{color: "rgba(0,0,0,.25)"}}
                                />
                            }
                            placeholder="Email"
                            name="email"
                            onChange={this.onChange}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Password!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{color: "rgba(0,0,0,.25)"}}
                                />
                            }
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.onChange}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {/* {getFieldDecorator("remember", {
                        valuePropName: "checked",
                        initialValue: true
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a> */}
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    {/* Or <a href="">register now!</a> */}
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: "login"})(Login);

export default WrappedNormalLoginForm;
