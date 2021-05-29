import React, { Component } from 'react';
import {
    Route, Switch
  } from "react-router-dom";
import ActivityDetail from '../Component/admin/activity/ActivityDetail';
import BlogDetail from '../Component/admin/blog/BlogDetail';
import LoginComponent from '../Component/pulic/LoginComponent';
import RegisterComponent from '../Component/pulic/RegisterComponent';
import ListActivity from '../Component/user/activity/ListActivity';
import ListBlog from '../Component/user/blog/ListBlog';
import HomeUser from '../Component/user/home/HomeUser';
import Unpermited from '../Component/user/home/Unpermited';
import MyActivity from '../Component/user/profile/MyActivity';
import UpdateProfile from '../Component/user/profile/UpdateProfile';

class UserRouter extends Component {
    render() {
        console.log("user router");
        return (
            <div>
                <Switch>
                    <Route exact path={["/", "/home"]} component={HomeUser}/>
                    <Route exact path="/login" component={LoginComponent}/>
                    <Route exact path="/register" component={RegisterComponent}/>
                    <Route exact path="/updateProfile" component={UpdateProfile}/>
                    <Route exact path="/user/activity/:id" component={ActivityDetail}/>
                    <Route exact path="/user/blog/:id" component={BlogDetail}/>
                    <Route exact path="/volunteer/all" component={ListActivity}/>
                    <Route exact path="/blog/all" component={ListBlog}/>
                    <Route exact path="/myActivity" component={MyActivity}/>
                    <Route component={Unpermited}/>
                </Switch>
            </div>
        );
    }
}

export default UserRouter;