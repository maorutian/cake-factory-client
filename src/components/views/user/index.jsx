import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from "antd";

import {PAGE_SIZE} from "../../../config/Constans";
import AddUpdateForm from './add-update-form';
import {formateDate} from '../../../utils/dateUtils';
import LinkButton from '../../link-button';
import {reqUsers, reqDeleteUser, reqUpdateUser, reqAddUser} from "../../../api";

class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
      addUpdateModalShow: 0, //0:hide; 1:Add, 2:Update
    };

    //initialize table columns
    this.initColumns();

  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    this.setState({loading: true});
    const users = await reqUsers();
    this.setState({loading: false});
    this.setState({users})
  };

  deleteUser = (user) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${user.username} ?`,
      onOk: async () => {
        await reqDeleteUser(user._id);
        message.success('User Deleted!');
        this.getUsers()
      }
    })
  };

  //create update user
  handleOk = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        let {username, password, phone, email, role} = values;
        let competition = {username, password, phone, email, role};

        if (this.state.addUpdateModalShow === 1) {//add
          //send ajax
          await reqAddUser(competition);
          console.log(competition);
        } else if (this.state.addUpdateModalShow === 2) {//update
          competition.id = this.user._id;
          await reqUpdateUser(competition);
        }

        this.form.resetFields();
        this.user = {};
        const action = this.state.addUpdateModalShow === 1 ? 'Add' : 'Update';
        message.success(action + ' Successfully');
        this.getUsers();
        this.setState({addUpdateModalShow: 0});

      }
    })

  };


  showAdd = () => {
    this.user = {};
    this.setState({addUpdateModalShow: 1})
  };

  //show update model
  showUpdate = (user) => {
    this.user = user;
    this.setState({addUpdateModalShow: 2})
  };

  initColumns = () => {
    this.columns = [
      {
        title: 'Username',
        dataIndex: 'username'
      },
      {
        title: 'Email',
        dataIndex: 'email'
      },

      {
        title: 'Phone',
        dataIndex: 'phone'
      },
      {
        title: 'Created Time',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: 'Role Name',
        dataIndex: 'role_name',
      },
      {
        title: 'Action',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>Update</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>Delete</LinkButton>
          </span>
        )
      }
    ]
  };


  render() {
    const {users, loading, addUpdateModalShow} = this.state;

    const title = <Button type='primary' onClick={this.showAdd}>Create User</Button>

    return (
      <div className="user">
        <Card title={title}>
          <Table
            bordered
            rowKey='_id'
            loading={loading}
            dataSource={users}
            columns={this.columns}
            pagination={{defaultPageSize: PAGE_SIZE}}
          />
          <Modal
            title={addUpdateModalShow === 1 ? 'Create User' : 'Update User'}
            visible={addUpdateModalShow !== 0}
            onOk={this.handleOk}
            onCancel={() => {
              this.form.resetFields();
              this.setState({addUpdateModalShow: 0})
            }}
          >
            <AddUpdateForm user={this.user} setForm={form => this.form = form}/>
          </Modal>
        </Card>
      </div>
    );
  }
}

export default User;