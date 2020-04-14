import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Tree} from 'antd';
import navList from '../../../config/navConfig';

const {TreeNode} = Tree;
const Item = Form.Item;


export default class AuthForm extends PureComponent {

  static propTypes = {
    role: PropTypes.object
  }

  state = {
    checkedKeys: []
  }

  getMenus = () => this.state.checkedKeys;

  getTreeNodes = (navList) => {
    return navList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  };

//update Authorities
  handleCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    })

  };

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(navList);
    const menus = this.props.role.menus;
    this.setState({checkedKeys: menus})

  }


  //change checkedKeys based on different ROLE passed from parent component

  componentDidUpdate(prevProps) {
    // const menus = this.props.role.menus;
    // this.setState({checkedKeys: menus})

    // // Typical usage (don't forget to compare props):
    if (this.props.role !== prevProps.role) {
      //this.fetchData(this.props.role);
      const menus = this.props.role.menus;
      this.setState({checkedKeys: menus})
    }
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   const menus = nextProps.role.menus
  //   this.setState({
  //     checkedKeys: menus
  //   })
  // }


  render() {
    const {name} = this.props.role;
    const {checkedKeys} = this.state;


    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 15},
    };

    return (
      <div>
        <Item label='Role Name' {...formItemLayout}>
          <Input value={name} disabled/>
        </Item>
        <Tree
          checkable  //Adds a Checkbox
          defaultExpandAll  //expand all treeNodes by default
          checkedKeys={checkedKeys}
          onCheck={this.handleCheck}
        >
          <TreeNode title="All Authorities" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>

      </div>
    )
  }
}