import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import {connect} from "react-redux";
import {setHeaderTitle} from '../../redux/actions';
import './index.less';
import logo from '../../assets/images/logo.png';
import navList from '../../config/navConfig';
import decode from "jwt-decode";

const {SubMenu} = Menu;

class Nav extends Component {


  constructor(props) {
    super(props);
    this.navItems = this.getNavigationItem(navList);

  }


  //get navList and return <Menu.Item> or <SubMenu>
  getNavigationItem = (navList) => {

    return navList.map(item => {

      //if the item is in the user's menus
      if (this.hasAuth(item)) {
        const path = this.props.location.pathname;
        const rootPath = "/" + path.split("/")[1];

        if (!item.children) { //<Menu.Item> no children item
          //redux set title
          if(item.key === rootPath){
            this.props.setHeaderTitle(item.title);
          }


          return (
            <Menu.Item key={item.key}>
              <Link to={item.key} onClick={()=>this.props.setHeaderTitle(item.title)}>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          )
        } else { //<SubMenu> children item
          //if the path is children item, parent item need to be open
          //defaultOpenKeys  Array with the keys of default opened sub menus
          //if the path is children item?
          //const path = this.props.location.pathname;
          // const childrenItem = item.children.find(childrenItem => childrenItem.key === path);
          // //the path is children item
          // if (childrenItem) {
          //   //set openKey to parent item key
          //   this.openKey = item.key
          // }

          //fix bug:when add and update product, nav item is not active


          const childrenItem = item.children.find(childrenItem => childrenItem.key === rootPath);
          //the path is children item
          if (childrenItem) {
            //set openKey to parent item key
            this.openKey = item.key;
            console.log(item.key)
          }

          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
              }
            >
              {this.getNavigationItem(item.children)}
            </SubMenu>
          );
        }
      } else {
        return "";
      }


    });
  };

  hasAuth = (item) => {
    const {key, isPublic} = item;

    let token = sessionStorage.getItem('token');
    let decodedData = decode(token);
    let menus = decodedData.user.menus;

    //if item is public or item.key is in the menus
    if (isPublic || menus.indexOf(key) !== -1) {
      return true

      //if item.children.key is in the menus
    } else if (item.children) {
      return item.children.some(child => menus.indexOf(child.key) !== -1)
    } else {
      return false;
    }


  };


  render() {
    //get path here, display navigation item(path) you select Actively
    //selectedKeys: Array with the keys of currently selected menu items
    const path = this.props.location.pathname;
    //fix bug - when add and update product, nav item is not active
    const rootPath = "/" + path.split("/")[1];


    return (
      <div className="nav">
        <Link className="nav-link" to="/home">
          <img src={logo} alt="logo"/>
          <h1>Admin</h1>
        </Link>

        <Menu
          selectedKeys={[rootPath]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.navItems}
        </Menu>

      </div>
    );
  }
}

//withRouter: pass updated match, location, and history props
export default connect(
  state => ({}),
  {setHeaderTitle}
)(withRouter(Nav));