import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBar extends Component {

    render() {
        return (
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Chung</div>
                        <a className="nav-link" href="index.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
                        Thống kê
                        </a>
                        <div className="sb-sidenav-menu-heading">Quản lý</div>
                        <a className="nav-link collapsed"  data-toggle="collapse" data-target="#activity" aria-expanded="false" aria-controls="activity">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
                        Quản lý hoạt động
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="activity" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/listActivity">Danh sách hoạt động</Link>
                            <Link className="nav-link" to="/createActivity">Thêm hoạt động</Link>
                        </nav>
                        </div>
                        <a className="nav-link collapsed"  data-toggle="collapse" data-target="#blogs" aria-expanded="false" aria-controls="blogs">
                        <div className="sb-nav-link-icon"><i className="fas fa-book-open" /></div>
                        Quản lý Blogs
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="blogs" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/listBlog">Danh sách blogs</Link>
                            <Link className="nav-link" to="/createBlog">Thêm blog</Link>
                        </nav>
                        </div>
                        <div className="sb-sidenav-menu-heading">Addons</div>
                        <a className="nav-link" href="charts.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-chart-area" /></div>
                        Charts
                        </a>
                        <a className="nav-link" href="tables.html">
                        <div className="sb-nav-link-icon"><i className="fas fa-table" /></div>
                        Tables
                        </a>
                    </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default SideBar;