import React, {Component} from 'react';
import {Card, Icon, Form, Input, Select, Button, message} from 'antd';

import LinkButton from "../../link-button";
import {reqAddProduct, reqCategories, reqUpdateProduct} from "../../../api";
import UpdatePicture from './update-picture'
import UpdateDraftEditor from "./update-draft-editor";

const Item = Form.Item;

class ProductAddUpdate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product: !this.props.location.state ? "" : this.props.location.state.product,
      categories: [],
    };

    //reference update-pictures component
    this.picturesRef = React.createRef();
    //reference update-draft-editor component
    this.editorRef = React.createRef();

    //add or update
    this.isUpdate = !!this.props.location.state;

  }

  componentDidMount() {
    this.getCategories();
    this.getUpdateProduct();
  }

  //get all categories
  getCategories = async () => {
    const categories = await reqCategories();
    this.setState({categories})
  };

  //get product by id for update
  getUpdateProduct = async () => {
    if (this.isUpdate) {
      let product = this.props.location.state.product;
      this.setState({product})
    }
  };


  //validate price
  validatePrice = (rule, value, callback) => {
    // if (value==='') {
    //   callback()
    // } else
    if (value * 1 <= 0) { //cast: string to number
      callback('Price can not less than 0')
    } else {
      callback()
    }
  };

  //submit form
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {name, desc, price, category} = values;
        console.log('send request', name, desc, price, category);
        const imgs = this.picturesRef.current.getImgs();
        console.log(imgs);
        const detail = this.editorRef.current.getDetail();
        console.log(detail);
        let product = {name, desc, price, category, imgs, detail};

        //add or update
        if (this.isUpdate) {
          product.id = this.state.product._id;
          await reqUpdateProduct(product);
        } else {
          await reqAddProduct(product);
        }
        message.success(`${this.isUpdate ? 'update' : 'add'} product successfully`);
        this.props.history.push('/product');
      }
    });
  };


  render() {
    const {categories, product} = this.state;
    const {getFieldDecorator} = this.props.form;
    //add or update
    const {isUpdate} = this;
    console.log(product.imgs);


    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"/>
        </LinkButton>
        <span>{isUpdate ? 'Update Product' : 'Add Product'}</span>
      </span>
    );
//Form layout
    const formLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 8}
    }


    return (
      <Card title={title}>
        <Form {...formLayout} onSubmit={this.handleSubmit}>
          <Item label="Product Name">
            {getFieldDecorator('name', {
              initialValue: product.name || "",
              rules: [
                {
                  required: true,
                  message: 'Please input product name',
                },
              ],
            })(<Input placeholder="Please input product name"/>)}
          </Item>
          <Item label="Ingredients">
            {getFieldDecorator('desc', {
              initialValue: product.desc || "",
              rules: [
                {
                  required: true,
                  message: 'Please input product Ingredients',
                },
              ],
            })(<Input placeholder="Please input product description"/>)}
          </Item>
          <Item label="Product Price">
            {getFieldDecorator('price', {
              initialValue: product.price || "",
              rules: [
                {
                  required: true,
                  message: 'Please input product price',
                },
                {validator: this.validatePrice}
              ],
            })(<Input type="number" addonBefore="$" placeholder="Please input product price"/>)}
          </Item>
          <Item label="Category">
            {getFieldDecorator('category', {
              initialValue: product.category || '',
              rules: [
                {
                  required: true,
                  message: 'Please select category',
                },
              ],
            })(
              <Select>
                <Select.Option value=''>Please select category</Select.Option>
                {
                  categories.map(c => <Select.Option value={c._id} key={c._id}> {c.name} </Select.Option>)
                }
              </Select>)}
          </Item>
          <Item label="Product Picture">
            <UpdatePicture ref={this.picturesRef} imgs={product.imgs}/>
          </Item>
          <Item label="Product Detail" wrapperCol={{span: 20}}>
            <UpdateDraftEditor ref={this.editorRef} detail={product.detail}/>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">submit</Button>
          </Item>

        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate);