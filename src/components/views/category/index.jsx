import React, {Component} from 'react';
import {Card, Button, Icon, Table, Divider, message, Modal} from 'antd';

import LinkButton from '../../link-button'
import AddUpdateForm from './add-update-form';
import {reqCategories, reqAddCategory, reqUpdateCategory, reqDeleteCategory} from '../../../api';


class Category extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [], // category array
      loading: false, // loading before get data
      showStatus: 0, // Modal status 0: hide, 1: add category, 2: update category
    };

    //initialize table columns
    this.initColumns();

  }

  componentDidMount() {
    this.getCategories();
  }

  //initialize table columns
  initColumns = () => {
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name', // table column name
      },
      {
        title: 'Action',
        key: 'actions.js',
        width: 500,
        render: (category) =>
          <span>
            <LinkButton onClick={() => {
              this.category = category; //store category in this, when we update we can get it
              this.setState({showStatus: 2})
            }
            }>Update</LinkButton>
            <Divider type="vertical"/>
            <LinkButton onClick={() => this.handleDelete(category)}>Delete</LinkButton>
          </span>
      },
    ];
  };

  //----------------------------AJAX START-----------------------//
  //send ajax to get categories
  getCategories = async () => {
    //display loading
    this.setState({loading: true});
    //send ajax
    const categories = await reqCategories();
    // hide loading
    this.setState({loading: false});
    //change data
    this.setState({categories});
  };
  //----------------------------AJAX END-----------------------//


  //----------------------------HANDLE CLICK START-----------------------//
  //Category Modal click ok - Add or Update
  handleOk = () => {
    //validation
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // success
        //get categoryName
        const {name} = values;
        //get state add or update
        const {showStatus} = this.state;
        let categories;
        if (showStatus === 1) { // add
          // send add ajax
          categories = await reqAddCategory(name);
        } else { // update
          const id = this.category._id;
          //send update ajax
          categories = await reqUpdateCategory({id, name});
        }
        //Clean value in the form
        this.form.resetFields(); // Reset the specified fields' value(to initialValue) and status.

        //hide category Modal
        this.setState({showStatus: 0});

        const action = showStatus === 1 ? 'Add' : 'Update';
        message.success(action + ' Successfully');

        // update category list
        this.getCategories();

      }
    });
  };

  //Category Modal click cancel
  handleCancel = () => {
    this.form.resetFields(); // Reset the specified fields' value(to initialValue) and status.
    this.setState({
      showStatus: 0
    })
  };

  //Delete category
  handleDelete = async (category) =>{
    Modal.confirm({
      title: `Are you sure you want to delete ${category.name} ?`,
      onOk: async () => {
        await reqDeleteCategory(category._id);
        message.success('Delete Successfully');
        this.category = {}
        // update category list
        this.getCategories();
      },
      onCancel() {
      },
    })
  };
  //----------------------------HANDLE CLICK END-----------------------//


  render() {
    //get state data
    const {categories, loading, showStatus} = this.state;

    //get category name, before click updated there is no category,so set it to {}
    const category = this.category || {};

    //table
    const title = 'Category List';
    const extra = ( //onClick={this.setState({showStatus:1})} call the function immediately
      //callback onClick={() => {this.setState({showStatus:1})}}
      <Button type='primary' onClick={() => {
        this.category = {}; //fix bug - click update then click add (clean category in this)
        this.setState({showStatus: 1})
      }}>
        <Icon type='plus'/>Add
      </Button>
    );


    return (
      <div className="category">
        <div>
          <Card title={title} extra={extra}>
            <Table
              bordered={true}
              rowKey="_id"
              loading={loading}
              dataSource={categories}
              columns={this.columns}
              pagination={{defaultPageSize: 6, showQuickJumper: true}}
            />
            <Modal
              title={showStatus === 1 ? "ADD CATEGORY" : "UPDATE CATEGORY"}
              visible={showStatus !== 0}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/*get form object from AddUpdateForm setForm function and store it in this */}
              <AddUpdateForm setForm={form => this.form = form} categoryName={category.name}/>
            </Modal>
          </Card>

        </div>
      </div>
    );
  }
}

export default Category;