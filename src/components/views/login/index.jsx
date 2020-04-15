import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Form, Icon, Input, Button,} from 'antd';
import {connect} from 'react-redux';
import {login} from '../../../redux/actions';
import './login.less';
import logo from '../../../assets/images/logo.png';
import _ from 'lodash';


class Login extends Component {


  handleSubmit = e => {
    //block submitting
    e.preventDefault();

    //Validate the specified fields and get their values and errors.
    this.props.form.validateFields((err, {username, password}) => {
      if (!err) {
        //use redux to send ajax
        this.props.login(username, password);
      } else {
        console.log('validate failed');
      }
    })
  };

  //validate password
  /*
  1.must input
  2.min:8 characters
  3.max:20 characters
  4.at least 1 uppercase letter
  5.at least 1 lowercase letter
  6.at least 1 number
  7.at least 1 symbol
   */
  validatePwd = (rule, value, callback) => {
    //console.log('validatePwd()', rule, value)
    value = value.trim();
    if (!value) {
      callback('Please input your password')
    } else if (value.length < 4) {
      callback('Password must contain 4 - 20 characters')
    } else if (value.length > 20) {
      callback('Password must contain 4 - 20 characters')
      // } else if (!/[A-Z]/.test(value)) {
      //   callback('Password must contain at least 1 uppercase letter')
      // } else if (!/[a-z]/.test(value)) {
      //   callback('Password must contain at least 1 lowercase letter')
      // } else if (!/[0-9]/.test(value)) {
      //   callback('Password must contain at least 1 number')
      // } else if (!/[^A-Za-z0-9\s]/.test(value)) {
      //   callback('Password must contain at least 1 symbol')
    } else {
      callback() // pwd ok
    }
  };


  //

  render() {
    //get loginUser from redux
    const loginUser = this.props.loginUser;
    if (!_.isEmpty(loginUser)) {
      if(!loginUser.errorMsg){
        console.log("redirect")
        return <Redirect to="/home"/>
      }
    }

    //Get form and Two-way binding
    const form = this.props.form;
    const {getFieldDecorator} = form;

    return (
      <div className="login">

        <div className="login-header">
          <img src={logo} alt="logo"/>
          <h1>Admin System</h1>
        </div>
        <div className="login-content">
          <div className={loginUser.errorMsg ? 'error-msg show' : 'error-msg'}>{loginUser.errorMsg}</div>
          <h1>LOGIN</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                initialValue: '',
                rules: [{required: true, whitespace: true, message: 'Please input your username!'}],
              })(
                <Input
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                initialValue: '',
                rules: [{validator: this.validatePwd}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  type="password"
                  placeholder="Password"
                />,
              )}

            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>

        </div>
      </div>
    );
  }
}

const WrapLogin = Form.create()(Login);
export default connect(
  state => ({loginUser: state.loginUser}),
  {login}
)(WrapLogin);