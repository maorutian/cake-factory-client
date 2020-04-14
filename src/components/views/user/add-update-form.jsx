import React, {Component} from 'react';
import {Form, Select, Input} from 'antd';
import PropTypes from 'prop-types';
import {reqRoles} from "../../../api";

const Item = Form.Item;
const Option = Select.Option;


class AddUpdateForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.props.setForm(this.props.form);

    this.state = {
      roles: []
    };
  }

  componentDidMount() {
    this.getRoles();
  }

  getRoles = async () => {
    const roles = await reqRoles();
    this.setState({roles});
  };

  validatePwd = (rule, value, callback) => {
    //console.log('validatePwd()', rule, value)
    value = value.trim();
    if (!value) {
      callback('Password is required')
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


  render() {
    const {getFieldDecorator} = this.props.form;
    const {username, password, phone, email, role} = this.props.user;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      <div>
        <Form {...formItemLayout}>
          <Item label='Username'>
            {
              getFieldDecorator('username', {
                initialValue: username || '',
                rules: [
                  {required: true, message: 'Username is required'}
                ]
              })(
                <Input placeholder='Please enter username'/>
              )
            }
          </Item>
          <Item label='Password'>
            {
              getFieldDecorator('password', {
                initialValue: password || '',
                rules: [
                  {validator: this.validatePwd}
                ]
              })(
                <Input type='password' placeholder='Please enter password'/>
              )
            }
          </Item>
          <Item label='Phone'>
            {
              getFieldDecorator('phone', {
                initialValue: phone || '',
              })(
                <Input placeholder='Please enter phone number'/>
              )
            }
          </Item>
          <Item label='Email'>
            {
              getFieldDecorator('email', {
                initialValue: email || '',
                rules: [
                  {
                    required: true, message: 'Email is required'
                  },
                  {
                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                    message: 'Email is not validated',
                  },
                ]
              })(
                <Input placeholder='Please enter Email'/>
              )
            }
          </Item>
          <Item label='Role'>
            {
              getFieldDecorator('role', {
                initialValue: role || '',
                rules: [
                  {required: true, message: 'Role is required'}
                ]
              })(
                <Select>
                  {
                    this.state.roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                  }
                </Select>
              )
            }
          </Item>
        </Form>

      </div>
    );
  }
}

export default Form.create()(AddUpdateForm);