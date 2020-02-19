import React from "react";
import {Form, Icon, Input, Button, Spin} from "antd";
import {loginUser} from "../actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.loginUser(values.email, values.password, this.props);
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
            <Spin tip="Loading...." spinning={this.props.loading}>
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

                        {/* Or <a href="">register now!</a> */}
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: "login"})(Login);

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

export default withRouter(
    connect(mapStateToProps, {loginUser})(WrappedNormalLoginForm)
);
