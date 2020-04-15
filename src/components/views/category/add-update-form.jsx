import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Form, Input} from 'antd';

const Item = Form.Item;

class AddUpdateForm extends Component {

  constructor(props) {
    super(props);
    //pass this.props.form to parent component by this.props.setForm function
    this.props.setForm(this.props.form)
  }

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categoryName: PropTypes.string,
  };


  render() {
    const {getFieldDecorator} = this.props.form;
    const {categoryName} = this.props;
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('name', {
              initialValue: categoryName || '', //add or update
              rules: [
                {required: true, message: 'name is required'}
              ]
            })(
              <Input type="text" placeholder="please enter name" />
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddUpdateForm)