import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../API';

const API_URL = API + "file/";

const style = {
    overflow: 'hidden',
    textOverflow: 'ellipsis', 
    display: '-webkit-box', 
    WebkitLineClamp: 2, /* number of lines to show */
    WebkitBoxOrient: 'vertical'
}

class Activity extends Component {
    constructor(props){
        super(props);
        this.state = {
            activity: ""
        }
    }

    componentDidMount() {
        this.setState({
            activity: this.props.activity
        })
    }

    render() {
        const activity = this.state.activity;
        var image = "";
        if(activity.image){
            image = activity.image.id;
        }
        return (
            <div>
                <div className="p-3 border-0 bg-light">
                    <div className="">
                        <img className="" src={API_URL + image} alt="thumbnail" width="100%" height="238px" style={{overflow: "hidden"}}/>
                    </div>
                    <div className="card-title">
                        <Link to={"/user/activity/" + activity.id} >{activity.title}</Link>
                    </div>
                    <div className="card-text" style={style}>
                        {activity.content}
                    </div>
                    <div className="class-text small">
                        {new Date(activity.fromDate).toLocaleDateString("en-GB")}
                    </div>
                </div>
            </div>
        );
    }
}

export default Activity;