import React, { Component } from 'react';
import { Link } from "react-router-dom";

class DropdownUser extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
    }

    toggleOpen = (e) => {
        e.preventDefault();
        document.getElementById("dropUser").classList.toggle("show");
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick)
    }
    
    componentWillUnmount() {
        // important
        document.removeEventListener('click', this.handleClick)
    }
    
    handleClick = (event) => {
        const { target } = event
        if (!this.wrapperRef.current.contains(target)) {
            var drop = document.getElementById("dropUser");
            if(drop.classList.contains("show"))
                drop.classList.remove("show");
        }
    }
    render() {
        return (
            <div ref={this.wrapperRef}>
                <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown" onClick={this.toggleOpen}>
                    <div className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user fa-fw" /></div>
                    <div className="dropdown-menu dropdown-menu-right" id="dropUser" aria-labelledby="userDropdown">
                        <Link to={"/profile"} className="dropdown-item">
                        {this.props.currentUser.username}
                        </Link>
                        <div className="dropdown-divider" />
                        <Link className="dropdown-item" to={"/login"} onClick={this.props.logOut}>LogOut</Link>
                    </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default DropdownUser;