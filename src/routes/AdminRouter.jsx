import React, {Component} from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './less/admin.less'

import Nav from '../components/nav';
import Header from '../components/header';
import Home from '../components/views/home';
import Category from '../components/views/category';
import ProductRouter from './ProductRouter';
import Role from '../components/views/role';
import User from '../components/views/user';
import Bar from '../components/views/statistic/myBar';
import Line from '../components/views/statistic/myLine';
import Pie from '../components/views/statistic/myPie';

const { Footer, Sider, Content } = Layout;

class AdminRouter extends Component {
  render() {
    // get user, if no user redirect to login
    let token = sessionStorage.getItem('token');
    if (!token) {
      return <Redirect to="/login"/>
    }

    return (
      <div>

        <Layout style={{height:'100%',minHeight:"700px"}}>
          <Sider>
            <Nav />
          </Sider>
          <Layout>
            <Header/>
            <div className="wrapper">
            <Content style={{background:'white', margin:'20px'}}>
              <Switch>
                <Route path="/home" component={Home}/>
                <Route path='/category' component={Category} />
                <Route path='/product' component={ProductRouter} />
                <Route path='/role' component={Role} />
                <Route path='/user' component={User} />
                <Route path='/bar' component={Bar} />
                <Route path='/line' component={Line} />
                <Route path='/pie' component={Pie} />
                <Redirect to="/home"/>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)'}} className="footer">
              Footer
            </Footer>

            </div>
          </Layout>
        </Layout>

      </div>

    );
  }
}

export default AdminRouter;