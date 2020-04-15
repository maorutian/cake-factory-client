import React, {Component} from 'react';
import {Card, Button, Table, Modal, message, Divider} from 'antd';

import {formateDate} from '../../../utils/dateUtils';
import LinkButton from '../../link-button';
import {reqAddRole, reqUpdateRole, reqRoles, reqDeleteRole} from '../../../api'
import {PAGE_SIZE} from "../../../config/Constans";
import AddForm from './add-form';
import AuthForm from './auth-form';
import decode from "jwt-decode";

class Role extends Component {
  state = {
    roles: [],
    isShowAdd: false,
    isShowAuth: false,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.authRef = React.createRef();

    this.initColumn();
  }

  componentDidMount() {
    this.getRoles()
  }

  getRoles = async () => {
    this.setState({loading: true});
    const roles = await reqRoles();
    this.setState({loading: false});
    this.setState({roles});
  };

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({
          isShowAdd: false
        });

        let newRole = {};
        newRole.name = values.name;
        let token = sessionStorage.getItem('token');
        let decodeddata = decode(token);
        newRole.created_name = decodeddata.user.username;
        newRole.created_time = Date.now();
        this.form.resetFields();
        const role = await reqAddRole(newRole);

        this.setState(state => ({roles: [...state.roles, role]}));
        message.success('Add successfully');
      }
    })
  };

  updateRole = async () => {
    this.setState({
      isShowAuth: false
    });
    let {role} = this;
    let token = sessionStorage.getItem('token');
    let decodeddata = decode(token);
    role.id = role._id;
    role.menus = this.authRef.current.getMenus();
    role.auth_time = Date.now();
    role.auth_name = decodeddata.user.username;

    await reqUpdateRole(role);
    message.success('Authorized successfully');
    this.setState({roles: [...this.state.roles]})
  };

  delete = (role) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${role.name} ?`,
      onOk: async () => {
        await reqDeleteRole(role._id);
        message.success('Delete Successfully');
        this.getRoles();
      },
      onCancel() {
      },
    })
  };


  showAuth = (role) => {
    this.role = role;
    this.setState({isShowAuth: true})
  };

  initColumn = () => {
    this.columns = [
      {
        title: 'Role Name',
        dataIndex: 'name'
      },
      {
        title: 'Created Time',
        dataIndex: 'created_time',
        //render: create_time => formateDate(create_time)
        render: formateDate
      },
      {
        title: 'Created Person',
        dataIndex: 'created_name'
      },
      {
        title: 'Authorized Time',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: 'Authorized Person',
        dataIndex: 'auth_name'
      },
      {
        title: 'Action',
        render: (role) =>
          <span>
            <LinkButton onClick={() => this.showAuth(role)}>Authorized</LinkButton>
            <Divider type="vertical"/>
            <LinkButton onClick={() => this.delete(role)}>Delete</LinkButton>
          </span>
      }
    ];
  };


  render() {
    const {roles, isShowAdd, isShowAuth,loading} = this.state;

    const title = (
      <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>
        Add Role
      </Button>
    );

    return (
      <div className="role">
        <Card title={title}>
          <Table
            bordered
            rowKey='_id'
            dataSource={roles}
            columns={this.columns}
            pagination={{defaultPageSize: PAGE_SIZE}}
            loading={loading}
          />

          <Modal
            title="Add Role"
            visible={isShowAdd}
            onOk={this.addRole}
            onCancel={() => {
              this.setState({isShowAdd: false});
              this.form.resetFields();
            }}
          >
            <AddForm
              setForm={(form) => this.form = form}
            />
          </Modal>

          <Modal
            title="Set Auth"
            visible={isShowAuth}
            onOk={this.updateRole}
            onCancel={() => {
              this.setState({isShowAuth: false})
            }}
          >
            <AuthForm role={this.role} ref={this.authRef}/>
          </Modal>
        </Card>
      </div>
    )
  }
}

export default Role;