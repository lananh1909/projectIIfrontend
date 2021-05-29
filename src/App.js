import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from './services/auth-service';
import MyRouter from './router/MyRouter'
import Nav from './Component/nav/Nav';
import UserNav from './Component/nav/UserNav';
import SideBar from './Component/nav/SideBar';
import UserRouter from './router/UserRouter';
import { connect } from 'react-redux';
import Footer from './Component/user/home/Footer';

class App extends Component{
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
      this.props.dispatch({type: "LOGIN"})
    }
    if(user && user.roles[0] === "ROLE_ADMIN"){
      this.props.dispatch({type: "ADMIN"})
    }
  
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
    this.props.dispatch({type: "LOGOUT"});
  }

  showSideNav(){
    document.getElementById("body").classList.toggle("sb-sidenav-toggled");
    document.getElementById("body").classList.toggle("sb-nav-fixed");
  }

  scrollToFooter() {
    window.scrollTo(0,document.body.scrollHeight);
  }
  
  render(){
    const {currentUser, showAdminBoard} = this.state;

    return(
      <Router>
        <div id="body">
          {showAdminBoard?(
            <div>
              <Nav showAdminBoard = {showAdminBoard} currentUser = {currentUser} logOut={this.logOut} showSideNav={this.showSideNav}/>
              <div id="layoutSidenav">
                <SideBar/>
                <MyRouter/> 
              </div>              
            </div>            
          ):(
            <div>
              <UserNav currentUser = {currentUser} logOut={this.logOut} scrollToFooter={this.scrollToFooter}/>
              <UserRouter/>
              <Footer/>
            </div>
          )}        
          
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}

export default connect(mapStateToProps)(App)