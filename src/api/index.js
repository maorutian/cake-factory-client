import ajax from './ajax';
import axios from 'axios';
import {BASE_HOST} from '../config/Constans';

const API = BASE_HOST + '/api';

//------------------------No Authorization------------------------------------
// no Authorization
const instance = axios.create();
instance.defaults.headers.common = {};
instance.defaults.headers.common.accept = 'application/json';

//login request
export const reqLogin = (username, password) => instance.post(API + '/login', {username, password});

//weather request
export const reqWeather = (city) => instance.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c7dbdc5297ee2fbbeaa2daed2a14e793`);

//--------------------------CATEGORY------------------------------
//get all categories
export const reqCategories = () => ajax.get(API + '/categories');

//get category by category id
export const reqCategoryById = (id) => ajax.get(API + '/category', {
  params: {id}
});

// add category
export const reqAddCategory = (name) => ajax.post(API + '/categories', {name});

// update category
export const reqUpdateCategory = ({id, name}) => ajax.put(API + '/categories', {
  id,
  name
});

// delete category
export const reqDeleteCategory = (id) => ajax.delete(API + '/categories', {
  data: {id}
});

//-----------------------------PRODUCT------------------------//
//get product list
export const reqProducts = ({pageNum, pageSize}) => ajax.get(API + '/products', {
  params: { // query
    pageNum,
    pageSize
  }
});

//get product by id
export const reqProductById = (id) => ajax.get(API + '/product', {
  params: {id}
});

//add product
export const reqAddProduct = (product) => ajax.post(API + '/products', product);

//update product
export const reqUpdateProduct = (product) => ajax.put(API + '/products', product);

//delete product
export const reqDeleteProduct = (id) => ajax.delete(API + '/products', {data: {id}});


//search product
export const reqSearchProducts = ({
                                    pageNum,
                                    pageSize,
                                    searchName,
                                    searchType // 'productName'or'productDesc'
                                  }) => ajax.get(API + '/productsearch', {
  //method: 'GET',
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName,
  }
});

//change product stock status
export const reqUpdateProductStatus = (productId, status) => ajax.put(API + '/productstatus', {
  productId,
  status
});

//upload img
export const updateImgUrl = API + '/images';

//delete img
export const reqDeleteImg = (name) => ajax.delete(API + '/images', {data:{name}});


//----------------------------ROLE----------------------------------------//
//get all roles
export const reqRoles = () => ajax.get(API + '/roles');

//add role
export const reqAddRole = (role) => ajax.post(API + '/roles', role);

//update role
export const reqUpdateRole = (role) => ajax.put(API + '/roles', role);

//delete role
export const reqDeleteRole = (id) => ajax.delete(API + '/roles', {data: {id}});

//----------------------------USER-------------------------------------//
//get users
export const reqUsers = () => ajax.get(API + '/users');

export const reqDeleteUser = (id) => ajax.delete(API + '/users', {data: {id}});

//add user
export const reqAddUser = (user) => ajax.post(API + '/users', user);

//update user
export const reqUpdateUser = (user) => ajax.put(API + '/users', user);


