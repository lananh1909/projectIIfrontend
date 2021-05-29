import React, { Component } from 'react';
import {
    Route, Switch
  } from "react-router-dom";
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
import ListUser from '../Component/admin/user/ListUser';
import CreateUser from '../Component/admin/user/CreateUser';
import EditUser from '../Component/admin/user/EditUser';
import CreateTopic from '../Component/admin/topic/CreateTopic';
import Unpermited from '../Component/user/home/Unpermited';
import DashBoard from '../Component/admin/dashboard/DashBoard';

class MyRouter extends Component {
    render() {
        console.log("admin router");
        return (
            <div id="layoutSidenav_content">
                <Switch>
                    <Route exact path="/login" component={LoginComponent}/>
                    <Route exact path="/register" component={RegisterComponent}/>
                    <Route exact path="/profile" component={ProfileComponent}/>
                    <Route exact path="/createActivity" component={CreateActivity}/>
                    <Route exact path="/listActivity" component={ListActivity}/>
                    <Route exact path="/activity/:id" component={ActivityDetail}/>
                    <Route exact path="/activity/edit/:id" component={EditActivity}/>
                    <Route exact path="/createBlog" component={AddBlog}/>
                    <Route exact path="/listBlog" component={ListBlog}/>
                    <Route exact path="/blog/:id" component={BlogDetail}/>
                    <Route exact path="/blog/edit/:id" component={EditBlog}/>
                    <Route exact path="/createUser" component={CreateUser}/>
                    <Route exact path="/listUser" component={ListUser}/>
                    <Route exact path="/user/edit/:id" component={EditUser}/>
                    <Route exact path="/createTopic" component={CreateTopic}/>
                    <Route exact path="/dashboard" component={DashBoard}/>
                    <Route exact path="/" component={DashBoard}/>
                    <Route component={Unpermited}/>
                </Switch>
            </div>
        );
    }
}

export default MyRouter;