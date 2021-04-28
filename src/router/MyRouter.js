import React, { Component } from 'react';
import {
    Route
  } from "react-router-dom";
import BoardAdmin from '../Component/admin/BoardAdmin';
import BoardUser from '../Component/user/BoardUser';
import Home from '../Component/pulic/HomeComponent';
import LoginComponent from '../Component/pulic/LoginComponent';
import ProfileComponent from '../Component/user/ProfileComponent';
import RegisterComponent from '../Component/pulic/RegisterComponent';
import CreateActivity from '../Component/admin/activity/CreateActivity';
import ListActivity from '../Component/admin/activity/ListActivity';
import ActivityDetail from '../Component/admin/activity/ActivityDetail';
import EditActivity from '../Component/admin/activity/EditActivity';
import AddBlog from '../Component/admin/blog/AddBlog';
import ListBlog from '../Component/admin/blog/ListBlog';
import BlogDetail from '../Component/admin/blog/BlogDetail';
import EditBlog from '../Component/admin/blog/EditBlog';

class MyRouter extends Component {
    render() {
        return (
            <div id="layoutSidenav_content">
                <Route exact path={["/", "/home"]} component={Home}/>
                <Route exact path="/login" component={LoginComponent}/>
                <Route exact path="/register" component={RegisterComponent}/>
                <Route exact path="/profile" component={ProfileComponent}/>
                <Route exact path="/user" component={BoardUser}/>
                <Route exact path="/admin" component={BoardAdmin}/>
                <Route exact path="/createActivity" component={CreateActivity}/>
                <Route exact path="/listActivity" component={ListActivity}/>
                <Route exact path="/activity/:id" component={ActivityDetail}/>
                <Route exact path="/activity/edit/:id" component={EditActivity}/>
                <Route exact path="/createBlog" component={AddBlog}/>
                <Route exact path="/listBlog" component={ListBlog}/>
                <Route exact path="/blog/:id" component={BlogDetail}/>
                <Route exact path="/blog/edit/:id" component={EditBlog}/>
            </div>
        );
    }
}

export default MyRouter;