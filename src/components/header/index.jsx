import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'
import {connect} from "react-redux";
import {logout} from '../../redux/actions';
import LinkButton from '../../components/link-button'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import './index.less';


class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()), //date
    weather: '', // weather
  };


  //logout
  logout = () => {
    Modal.confirm({
      title: 'Are you sure you want to logout?',
      onOk: () => { //use THIS in the function ()=>
        console.log('OK');
        //use logout from redux
        this.props.logout();
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  };

  // //get weather
  getWeather = async () => {
    const response = await reqWeather('Toronto');
    //update state
    this.setState({weather: response.data.weather[0].description})
  };


  componentDidMount() {
    // set time interval
    this.intervalId = setInterval(() => {
      // update currentTime each second
      this.setState({
        currentTime: formateDate(Date.now())
      })
    }, 1000);
    //send ajax for weather
    this.getWeather();
  }


  componentWillUnmount() {
    // clear time interval
    clearInterval(this.intervalId)
  }


  render() {
    console.log("header");
    const {currentTime, weather} = this.state;
    const title = this.props.headerTitle;

    let username = this.props.loginUser.user.username;

    return (
      <div className="header">
        <div>
          <div className="header-top">
            welcome,{username}!&nbsp;&nbsp;
            <LinkButton onClick={this.logout}>Logout</LinkButton>
          </div>
          <div className="header-bottom">
            <div className="header-bottom-left">{title}</div>
            <div className="header-bottom-right">
              <span>{currentTime}</span>&nbsp;&nbsp;
              <span>Toronto: {weather}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    headerTitle: state.headerTitle,
    loginUser: state.loginUser
  }),
  {logout})(withRouter(Header));