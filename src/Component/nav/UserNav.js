import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';

class UserNav extends Component {
    render() {
        return (
            <div>
                <nav className="sb-topnav navbar navbar-expand py-3 shadow-sm bg-white">         
                    <Link to={"/"} className="navbar-brand w-auto border-right">
                        <img src="/logo.png" height={45} alt="logo" className="d-inline-block align-middle mr-2"/>
                        Quỹ bảo trợ trẻ em Điện Biên
                    </Link>
                    
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item hover-item">
                        <Link to={"/home"} className="nav-link">
                            Trang chủ
                        </Link>
                        </li>

                        
                        <li className="nav-item hover-item">                            
                            <Link to={"/volunteer/all"} className="nav-link">
                            Tình nguyện
                            </Link>
                        </li>

                        <li className="nav-item hover-item">
                            <Link to={"/blog/all"} className="nav-link">
                            Bài viết
                            </Link>
                        </li>
                        <li className="nav-item hover-item">
                            <div className="nav-link text-primary" onClick={this.props.scrollToFooter}>
                            Liên hệ
                            </div>
                        </li>
                    </div>


                    {this.props.currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item border-right">
                                <a href="https://www.facebook.com/Qu%E1%BB%B9-B%E1%BA%A3o-tr%E1%BB%A3-tr%E1%BA%BB-em-t%E1%BB%89nh-%C4%90i%E1%BB%87n-Bi%C3%AAn-456115844746109" target="_blank" rel="noreferrer" className="nav-link">
                                    <i className="fab fa-facebook-square"></i>
                                </a>
                            </li>
                            
                            <DropdownUser logOut={this.props.logOut} currentUser={this.props.currentUser}/>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                        <li className="nav-item border-right">
                            <a href="https://www.facebook.com/Qu%E1%BB%B9-B%E1%BA%A3o-tr%E1%BB%A3-tr%E1%BA%BB-em-t%E1%BB%89nh-%C4%90i%E1%BB%87n-Bi%C3%AAn-456115844746109" target="_blank" rel="noreferrer" className="nav-link">
                                <i className="fab fa-facebook-square"></i>
                            </a>
                        </li>
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

export default UserNav;