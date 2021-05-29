import React, { Component } from 'react';
import authService from '../../../services/auth-service';
import Chart from './Chart';

class DashBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: [],
            attend: [],
            numUser: "",
            numBlog: "",
            numActivity: ""
        }
    }
    componentDidMount() {
        authService.getStatistic().then(
            response => {
                this.setState({
                    user: response.data.user,
                    attend: response.data.attend,
                    numUser: response.data.numUser,
                    numActivity: response.data.numActivity,
                    numBlog: response.data.numBlog
                })
            },
            error => {
                console.log(error.toString());
            }
        )
    }
    
    render() {
        return (
            <div className="col">
                <div className="row">
                    <div className="col-sm-6">
                        <Chart user={this.state.user} attend={this.state.attend}/>
                    </div>
                    <div className="col-sm-6">
                        <div className="border-left-primary shadow mt-2" style={{width: "500px"}}>
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Tổng số người dùng</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.numUser}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-users fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-left-primary shadow mt-2" style={{width: "500px"}}>
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Tổng số hoạt động</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.numActivity}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-columns fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-left-primary shadow mt-2" style={{width: "500px"}}>
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Tổng số bài viết</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.numBlog}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-book-open fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashBoard;