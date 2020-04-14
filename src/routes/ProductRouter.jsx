import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './less/product.less'

import ProductHome from '../components/views/product'
import ProductAddUpdate from '../components/views/product/add-update'
import ProductDetail from '../components/views/product/detail'


export default class ProductRouter extends Component {

  render () {
    return (
      <Switch>
        <Route path="/product" exact component={ProductHome}/> {/* exact: exactly match*/}
        <Route path="/product/detail/:id" component={ProductDetail}/>
        <Route path="/product/detail" component={ProductDetail}/>
        <Route path="/product/addupdate/:id" component={ProductAddUpdate}/>
        <Route path="/product/addupdate" component={ProductAddUpdate}/>
        <Redirect to="/product" />
      </Switch>
    )
  }
}