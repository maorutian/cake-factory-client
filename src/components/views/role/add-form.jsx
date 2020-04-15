import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Form, Input} from 'antd';


class AddForm extends PureComponent {

  static propTypes = {
    setForm: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    //pass this.props.form to parent component by this.props.setForm function
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };

    return (
      <Form>
        <Form.Item label="Role Name" {...formItemLayout}>
          {
            getFieldDecorator('name', {
              initialValue: '',
              rules: [
                {required: true, message: 'Role Name is required'}
              ]
            })(
              <Input type="text" placeholder="Role Name is required" />
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default AddForm = Form.create()(AddForm)