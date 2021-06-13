import { Pagination } from '@material-ui/lab';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import activityService from '../../../services/activity-service';
import addressService from '../../../services/address-service';
import topicService from '../../../services/topic-service';
import Activity from '../home/Activity';
import RegisterForm from './RegisterForm';

class ListActivity extends Component {
    constructor(props){
        super(props);
        this.state = {
            topics: "",
            searchTitle: "",
            page: 1,
            count: 0,
            pageSize: 8,
            topic: "",
            list: [],
            district: "0",
            itemRegister: "0"
        }
    }

    componentDidMount() {
        this.retrieveActivity();
        topicService.getTopic().then(
            response => {
                this.setState({
                    topics: response.data
                });
            }, 
            error => {
                console.log(error.toString());
            }
        )

        addressService.getDistricts(11).then(
            response => {
                this.setState({
                    districts: response
                })
            }, 
            error => {
                console.log(error.toString());
            }
        )
    }

    retrieveActivity = () => {
        const params = this.getRequestParams(this.state.searchTitle, this.state.page, this.state.pageSize, this.state.topic, this.state.district);
    
        activityService.getByPage(params)
        .then((response) => {
            const {activities, totalPages } = response.data;
            const myData = [].concat(activities).sort((a, b) => {
                if (a["fromDate"] > b["fromDate"]) {
                   return -1;
                }
                if (a["fromDate"] < b["fromDate"]) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                list: myData,
                count: totalPages
            })
        }, 
        (error) => {
            console.log(error);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    onChangeSearchTitle = (e) => {
        const search = e.target.value;
        this.setState({
            searchTitle: search
        }, () => this.findByTitle())
    };

    findByTitle = () => {
        this.setState({
            page: 1
        }, () => this.retrieveActivity());
    };

    getRequestParams = (searchTitle, page, pageSize, topic, districtId) => {
        let params = {};
    
        if (searchTitle) {
          params["title"] = searchTitle;
        }
    
        if (page) {
          params["page"] = page - 1;
        }
    
        if (pageSize) {
          params["size"] = pageSize;
        }
        if(topic){
            params["topic"] = topic;
        }
        if(districtId){
            params["districtId"] = districtId;
        }
    
        return params;
    };

    handlePageChange = (event, value) => {
        this.setState({
            page: value
        }, () => {this.retrieveActivity()})
        window.scrollTo(0, 0);
    };

    handleTopicChange = (event) => {
        var value = event.target.querySelector("input").value;
        
        this.setState({
            topic: value,
            page: 1,
            district: "0"
        }, () => {this.retrieveActivity()})      
        
    }

    onDistrictChange = (event) => {
        this.setState({
            district: event.target.value,
            page: 1,
            topic: "0"
        }, () => this.retrieveActivity())        
    }

    onSearchTitleChange = (e) => {
        this.setState({
            searchTitle: e.target.value
        }, () => this.retrieveActivity())
    }

    onClickRegister = (e, id) => {
        if(!this.props.login){
            e.preventDefault();
            window.alert("Bạn cần đăng nhập để đăng ký hoạt động!");
            window.location.replace("/login");
        } else {
            this.setState({
                itemRegister: id
            })
        }
    }
    
    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card-titles text-white bg-info p-1">
                            <i className="fab fa-pagelines"></i>
                            CHỦ ĐỀ
                        </div>
                        <div className="btn-group-toggle bg-light" data-toggle="buttons" value={this.state.topic}>
                            <div className="p-2 btn btn-light btn-block active" key="15" id="allTopic" onClick={this.handleTopicChange}>
                                <input type="radio" value="0" name="topic" id="all" autoComplete="off" defaultChecked ></input>
                                Tất cả
                            </div>
                            {this.state.topics && this.state.topics.map((item, index) => (
                                <div className="p-2 btn btn-light btn-block" key={index} onClick={this.handleTopicChange}>
                                    <input type="radio" name="topic" value={item.id} id={index} autoComplete="off"></input>
                                    {item.topicName}
                                </div>
                            ))}
                        </div>

                        <div className="mt-3">
                            <div className="card-title">Địa điểm: <b>Tỉnh Điện Biên</b></div>
                            <select name="district" id="district" 
                            onChange={this.onDistrictChange} 
                            value={this.state.district}
                            className="form-control"
                            >
                            <option value="0">Chọn Huyện</option>
                            {this.state.districts &&
                            this.state.districts.map((x, index) => {
                                return (
                                    <option key={index} value={x.districtId}>{x.districtName}</option>
                                )
                            })}
                            </select>
                        </div>

                        <div className="mt-3">
                            <div className="card-title">
                                Nhập từ khóa:
                            </div>
                            <input type="text" className="form-control" placeholder="Tìm kiếm" value={this.state.searchTitle} onChange={this.onSearchTitleChange}></input>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="card-titles text-white bg-info p-1">
                            <i className="fas fa-newspaper"></i>
                             TẤT CẢ HOẠT ĐỘNG
                        </div>
                        <div className="mt-3 row">
                            {this.state.list && this.state.list.map((item, index) => (
                                <div className="col-sm-6 mb-2">
                                    <Activity activity={item} key={item.id}/>
                                    <div className="col bg-light text-right pb-2">
                                    <button disabled={new Date(item.fromDate) <= new Date()} onClick={(e, id) => this.onClickRegister(e, item.id)} data-toggle="modal" data-target="#attend" className="btn btn-success col-sm-4 mt-3">Đăng Ký</button>
                                    </div>
                                    
                                </div>
                            ))}
                            <div id="attend" className="modal fade" role="dialog">
                                <div className="modal-dialog modal-xl">                                                       
                                    <div className="modal-content">  
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal"><i className="fas fa-times"></i></button>                                
                                        </div>  
                                        <RegisterForm actId={this.state.itemRegister}/>
                                    </div>
                                </div>                         
                            </div>
                        </div>

                        <div className="mt-3">
                        <Pagination className="my-3"
                        count={this.state.count}
                        page={this.state.page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={this.handlePageChange}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        login: state.isLogin
    }
}

export default connect(mapStateToProps)(ListActivity)