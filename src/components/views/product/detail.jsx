import React, {Component} from 'react';
import {Card, Icon, List} from 'antd';

import LinkButton from "../../link-button";
import {reqCategoryById, reqProductById} from "../../../api";
import {BASE_HOST} from "../../../config/Constans";

const BASE_IMG = BASE_HOST + '/api/public/upload/';
const Item = List.Item;

export default class ProductDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product: !this.props.location.state ? {imgs:[]} : this.props.location.state.product
    };
  }

  componentDidMount() {
    if(!this.props.location.state){
      this.getProduct();
    }

  }


  //get product by id and category name
  getProduct = async () => {

    const id = this.props.match.params.id;
    console.log(id);
    let product = await reqProductById(id);
    let category = await reqCategoryById(product.category);
    product.categoryName = category.name;
    console.log(product);
    this.setState({product: product})
  };

  //if img is not null dispaly, otherwise don't
  displayImg = (imgs) => {
    if (imgs.length !== 0) {
      return imgs.map(img => <img
        className="detail-img"
        key={img}
        src={BASE_IMG + img}
        alt="img"/>)
    } else {
      return "";
    }
  };

  render() {
    const {name, desc, price, imgs, detail, categoryName} = this.state.product;

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"/>
        </LinkButton>
        <span>Product Detail</span>
      </span>
    );


    return (
      <Card title={title} className="detail">
        <List>
          <Item>
            <span className="detail-left">Product Name:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="detail-left">Ingredients:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="detail-left">Product Price:</span>
            <span>$ {price}</span>
          </Item>
          <Item>
            <span className="detail-left">Product Category:</span>
            <span>{categoryName}</span>
          </Item>
          <Item>
            <span className="detail-left">Product Picture:</span>
            <span>
              {this.displayImg(imgs)}
            </span>
          </Item>
          <Item>
            <span className="detail-left">Prodoct Description:</span>
            <span dangerouslySetInnerHTML={{__html: detail}}></span>
            {/*parse to html like innerhtml*/}
          </Item>
        </List>
      </Card>
    )
  }
}