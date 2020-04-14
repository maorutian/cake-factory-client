import axios from 'axios';
import {message} from 'antd';

// Add a request interceptor
// Add Token to headers
axios.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem('token');
  config.headers = {'x-auth-token': token};
  return config
});

//Add a response interceptor change promise
axios.interceptors.response.use(function (response) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  //get data directly
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Message all the response errors
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.errors) {
        let errorMsg = error.response.data.errors[0].msg;
        message.error(`Error ${error.response.status} : ${errorMsg}`);
      } else message.error('Response Error ' + error.message);
    } else message.error('Response Error ' + error.message);
  } else {
    message.error('Response Error ' + error.message);
  }

  // return a new promise(pending), break promise chain
  return new Promise(() => {
  });
});

export default axios;