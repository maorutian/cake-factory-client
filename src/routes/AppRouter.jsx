import React, {Component} from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';

import Login from '../components/views/login/';
import AdminRouter from './AdminRouter';

class AppRouter extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" component={AdminRouter}/>

        </Switch>
      </HashRouter>
    );
  }
}

export default AppRouter;