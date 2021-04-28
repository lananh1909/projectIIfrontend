import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from './services/auth-service';
import MyRouter from './router/MyRouter'
import Nav from './Component/nav/Nav';
import SideBar from './Component/nav/SideBar';
import UserSideBar from './Component/nav/UserSideBar';

export default class App extends Component{
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state= {
      showAdminBoard: false,
      currentUser: undefined,
      showSideNav:false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
  
    if(user){
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }
  
  logOut(){
    AuthService.logOut();
    this.setState({
      currentUser: undefined,
      showAdminBoard: false
    });
  }

  showSideNav(){
    document.getElementById("body").classList.toggle("sb-sidenav-toggled");
  }
  
  render(){
    const {currentUser, showAdminBoard} = this.state;

    return(
      <Router>
        <div id="body" className= "sb-nav-fixed">
          <Nav showAdminBoard = {showAdminBoard} currentUser = {currentUser} logOut={this.logOut} showSideNav={this.showSideNav}/>
          <div id="layoutSidenav">
            {currentUser && !showAdminBoard && <UserSideBar/>}
            {showAdminBoard && <SideBar/>}
            <MyRouter/> 
          </div>
        </div>
      </Router>
    );
  }
}