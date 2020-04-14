import React, {Component} from 'react';
import {Card, Select, Input, Button, Icon, Table, message, Divider, Modal} from 'antd';
import throttle from 'lodash.throttle';

import LinkButton from "../../link-button";
import {reqDeleteProduct, reqProducts, reqSearchProducts, reqUpdateProductStatus} from "../../../api";
import {PAGE_SIZE} from "../../../config/Constans";

const Option = Select.Option;

class ProductHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      products: [], //product list
      total: 0, //total product amount
      searchType: 'productName', //default search product name
      searchName: '',

    };

    //initialize table columns
    this.initColumns();

  }

  componentDidMount() {
    //get first page
    this.getProducts(1);
  }

  //initial table columns
  initColumns = () => {
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Category',
        dataIndex: 'categoryName'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        //if display is not dataindex itself, use render
        //if no dataIndex use render: (product) => '$' + product.price
        render: (price) => '$' + price
      },
      {
        title: 'Status',
        // dataIndex: 'status',
        render: ({_id, status}) => {
          let btnText = 'Change';
          let text = 'Out of Stock';
          if (status === 2) {
            btnText = 'Change';
            text = 'In Stock';
          }
          return (
            <span>
              <span>{text}</span><br/>
              <Button size="small" type="primary" onClick={() => {
                this.updateProductStatus(_id, status)
              }}>{btnText}</Button><br/>
            </span>
          )
        }
      },
      {
        title: 'Action',
        render: (product) =>
          <span>
            <LinkButton onClick={() => {
              //pass product to detail page
              //this.props.history.push({pathname: '/product/detail', state: {product}});
              //this.props.history.push('/product/detail/' + product._id);
              this.props.history.push({pathname: ('/product/detail/' + product._id), state: {product}});
            }
            }>View</LinkButton>
            <Divider type="vertical"/>
            <LinkButton onClick={() => {
              //this.props.history.push({pathname: '/product/addupdate', state: {product}});
              //this.props.history.push('/product/addupdate/' + product._id);
              this.props.history.push({pathname: ('/product/addupdate/' + product._id), state: {product}});
            }
            }>Update</LinkButton>
            <Divider type="vertical"/>
            <LinkButton onClick={() => this.handleDelete(product)}>Delete</LinkButton>
          </span>
      },
    ];
  };

  //----------------------------AJAX START-----------------------//
  //send ajax to get product
  getProducts = async (pageNum) => {
    this.setState({loading: true});
    this.pageNum = pageNum; //store current page number
    //console.log(pageNum,PAGE_SIZE);
    const data = await reqProducts({pageNum, pageSize: PAGE_SIZE});
    const {total, list} = data;
    this.setState({loading: false});
    this.setState({products: list, total});
  };

  //send ajax to search product
  searchProduct = async (pageNum) =>{
    const {searchName, searchType} = this.state;
    const data = await reqSearchProducts({pageNum:this.pageNum, pageSize: PAGE_SIZE,searchName,searchType});
    const {total, list} = data;
    this.setState({products: list, total});
  };

  //send ajax to change product status
  updateProductStatus = async (id, status) => {
    //get new status
    status = status === 1 ? 2 : 1;
    //send ajax
    await reqUpdateProductStatus(id, status);
    message.success('update status successfully');
    this.getProducts(this.pageNum);

  };

  //Delete product
  handleDelete = async (product) =>{
    Modal.confirm({
      title: `Are you sure you want to delete ${product.name} ?`,
      onOk: async () => {
        await reqDeleteProduct(product._id);
        message.success('Delete Successfully');
        this.product = {};
        // update Products list
        this.getProducts(this.pageNum);
      },
      onCancel() {
      },
    })
  };



  //----------------------------AJAX END-----------------------//


  render() {
    const {loading, products, total, searchType, searchName} = this.state;

    const title = (
      <span>
        <Select
          style={{width: 200}}
          value={searchType}
          onChange={(value) => this.setState({searchType: value})}
        >
          <Option value="productName">search by Name</Option>
          <Option value="productCategory">search by Category</Option>
        </Select>
        <Input
          style={{width: 200, margin: '0 10px'}}
          placeholder="search"
          value={searchName}
          onChange={event => this.setState({searchName: event.target.value})}
        />
        <Button type="primary" onClick={() => {
          this.searchProduct();
        }}>SEARCH</Button>
      </span>
    );

    const extra = (
      <Button type="primary" onClick={() => {
        this.props.history.push('/product/addupdate');
      }}>
        <Icon type="plus"/>
        Add Product
      </Button>
    );

    return (
      <div className="product">
        <Card title={title} extra={extra}>
          <Table
            bordered={true}
            rowKey="_id"
            loading={loading}
            columns={this.columns}
            dataSource={products}
            pagination={{
              total,  //Total number of data items
              defaultPageSize: PAGE_SIZE, //Default number of data items per page
              showQuickJumper: true,  //Determine whether you can jump to pages directly
              onChange: this.getProducts,  //Called when the page number is changed, and it takes the resulting page number and pageSize as its arguments
              //onChange: (page) => this.this.getProducts(page), this.getProducts: give onChange function this.getProducts():give onChange the result of the function
              current: this.pageNum  //Current page number
            }}
          />
        </Card>
      </div>
    );
  }
}

export default ProductHome;