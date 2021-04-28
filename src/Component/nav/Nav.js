import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DropdownUser from './DropdownUser';

class Nav extends Component {    
    render() {
        return (
            <div>
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                    {this.props.showAdminBoard && (                   
                    <Link to={"/admin"} className="navbar-brand">
                    Admin Board
                    </Link>
                    )}
                    {this.props.currentUser &&
                        <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" onClick={this.props.showSideNav}><i className="fas fa-bars" /></button>
                    }
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                        </li>

                        {this.props.showAdminBoard && (
                        <li className="nav-item">                            
                            <Link to={"/admin"} className="nav-link">
                            Admin Board
                            </Link>
                        </li>
                        )}

                        {this.props.currentUser && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                            User
                            </Link>
                        </li>
                        )}
                    </div>

                    {this.props.currentUser ? (
                        <DropdownUser logOut={this.props.logOut} currentUser={this.props.currentUser}/>
                    ) : (
                        <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                            Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                            Sign Up
                            </Link>
                        </li>
                        </div>
                    )}
                </nav>
            </div>      
        );
    }
}

export default Nav;