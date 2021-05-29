import { Pagination } from '@material-ui/lab';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import activityService from '../../../services/activity-service';
import topicService from '../../../services/topic-service';
import Activity from './Activity';

const pageSizes = [3, 6, 9];

class ListActivity extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: "", 
            timeDecrease: false,
            volunteerDecrease: false,
            table: true,
            sortConfig: "",
            searchTitle: "",
            page: 1,
            count: 0,
            pageSize: 3,
            topic: 0,
            topics: []
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
    }

    deleteActivity = (id) => {
        var r = window.confirm("Bạn có chắc muốn xóa hoạt động này không?");
        if (r === true) {
            activityService.deleteActivity(id);
            var n = this.state.list.filter(item => item.id !== id);
            this.setState({
                list: n
            })
        } else {
        }        
    }

    sortTable = (name) => {
        const sortConfig = this.state.sortConfig;
        let direction = 'up';
        if (sortConfig && sortConfig.key === name && sortConfig.direction === 'up') {
            direction = 'down';
        }
        this.setState({
            sortConfig: {
                key: name,
                direction: direction
            }
        }, () => {
             this.sort();
        });        
    }

    sort(){
        const sortConfig = this.state.sortConfig;
        if (sortConfig) {            
            const myData = [].concat(this.state.list).sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'up' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'up' ? 1 : -1;
                }
                return 0;
            });
            this.setState({
                list: myData
            })
            var x = document.getElementsByClassName("icon");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            const icon = document.getElementById(sortConfig.key);
            if(icon){
                icon.style.display = 'inline';
                if(sortConfig.direction === 'up'){
                    icon.classList.add('fa-sort-up');
                } else if(sortConfig.direction === 'down'){
                    icon.classList.add('fa-sort-down');
                }
            }
        }
    }
    toTable(){
        this.setState({
            table: !this.state.table
        })
    }

    toStringCommune(commune){
        if(commune){
            var district = commune.district;
            var province = district.province;
            return commune.communeName + ", " + district.districtName + ", " + province.provinceName;   
        }            
    }

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

    getRequestParams = (searchTitle, page, pageSize, topic) => {
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
    
        return params;
    };

    retrieveActivity = () => {
        const params = this.getRequestParams(this.state.searchTitle, this.state.page, this.state.pageSize, this.state.topic);
    
        activityService.getByPage(params)
        .then((response) => {
            const {activities, totalPages } = response.data;
            this.setState({
                list: activities,
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

    handlePageChange = (event, value) => {
        this.setState({
            page: value
        }, () => {this.retrieveActivity()})
    };

    handlePageSizeChange = (event) => {
        this.setState({
            pageSize: event.target.value,
            page: 1
        }, () => {this.retrieveActivity()})
    };
    

    handleTopicChange = (event) => {
        this.setState({
            topic: event.target.value
        }, () => {this.retrieveActivity()})
    }

    render() {
        return (
            <div className="container">
                <div><Link to="/createActivity" className="btn btn-primary mt-5"><i className="far fa-calendar-plus mr-1"></i>Thêm</Link></div>  
                <button className="btn btn-secondary mt-1 mb-1" onClick={() => this.toTable()}>{this.state.table?"Card": "Table"}</button>
                <div className="row mb-3 mt-3">
                    <div className="col-sm-6">
                        <div className="input-group">
                            <input type="text"
                            className="from-control"
                            placeholder="Tìm kiếm"
                            value={this.state.searchTitle}
                            onChange={this.onChangeSearchTitle}/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.findByTitle}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-4 text-right" style={{"padding":"6px"}}>Chọn chủ đề:</div>
                            <div className="col-sm-8">
                                <select name="topic" className="custom-select"                
                                value={this.state.topic}
                                onChange={this.handleTopicChange}
                                >
                                    <option value="0">All</option>
                                    {this.state.topics &&
                                    this.state.topics.map((x) => {
                                        return (
                                            <option value={x.id} key={x.id}>{x.topicName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>                        
                    </div>
                </div>
                
                <div className="mt-3">
                    Items per page: 
                    <select onChange={this.handlePageSizeChange} value={this.state.pageSize}>
                        {pageSizes.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                    <Pagination className="my-3"
                    count={this.state.count}
                    page={this.state.page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={this.handlePageChange}/>
                </div>     
                {this.state.table?(<div>
                    <table className="table table-striped">
                        <thead style={{background: 'pink'}}>
                            <tr>
                            <th scope="col" className="align-middle">STT</th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("title")}>Tiêu đề <i id="title" className="fas icon" style={{display: 'none'}}></i></th>
                            <th scope="col" className="align-middle">Địa điểm</th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("fromDate")}>Từ ngày <i id="fromDate" className="fas icon" style={{display: 'none'}}></i></th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("toDate")}>Đến ngày <i id="toDate" className="fas icon" style={{display: 'none'}}></i></th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("numVolunteer")}>Số người đăng ký <i id="numVolunteer" className="fas icon" style={{display: 'none'}}></i></th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("createdBy")}>Người tạo <i id="createdBy" className="fas icon" style={{display: 'none'}}></i></th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("createdDate")}>Ngày tạo <i id="createdDate" className="fas icon" style={{display: 'none'}}></i></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.list?this.state.list.map((act, index) => {
                                return (
                                    <tr key={act.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{act.title}</td>
                                        <td>{this.toStringCommune(act.commune)}</td>
                                        <td>{new Date(act.fromDate).toLocaleDateString("en-GB")}</td>
                                        <td>{new Date(act.toDate).toLocaleDateString("en-GB")}</td>
                                        <td>{act.numVolunteer}</td>
                                        <td>{act.createdBy}</td>
                                        <td>{act.createdDate}</td>
                                        <td>
                                        <div className="btn-group btn-block" style={{float:"right"}}>
                                            <button type="button" className="btn btn-danger col-sm-4" onClick={(id) => this.deleteActivity(act.id)}><i className="far fa-trash-alt mr-1"></i></button>
                                            <Link to={"/activity/edit/" + act.id} className="btn btn-warning col-sm-4"><i className="fas fa-pencil-alt mr-1"></i></Link>
                                            <Link to={"/activity/" + act.id} className="btn btn-success col-sm-4"><i className="fas fa-info-circle mr-1"></i></Link>
                                        </div>
                                        </td>                                    
                                    </tr>
                                )
                            }):(<tr></tr>)}                        
                            
                        </tbody>
                    </table>
                </div>):(
                    <div>
                        <div className="row">
                            <div className="col-sm-2" style={{paddingTop: '6px'}}>Xắp xếp theo: </div>
                            <div className="col-sm-10">
                                <div className="btn-group">
                                    <button className="btn btn-primary" onClick={(name) => this.sortTable("fromDate")}>Thời gian <i id="fromDate" className="fas fa-sort-up icon" style={{display: 'none'}}></i></button>
                                    <button className="btn btn-primary" onClick={(name) => this.sortTable("numVolunteer")}>Người đăng ký <i id="numVolunteer" className="fas fa-sort-up icon" style={{display: 'none'}}></i></button>
                                </div>
                            </div>
                        </div> 
                        <div className="card-columns">
                        {this.state.list && (this.state.list.map((act) => 
                                <Activity activity={act} delete={(id) => this.deleteActivity(act.id)} key={act.id}/>
                            )
                        )}
                        </div>
                    </div>
                )}                
            </div>
        );
    }
}
export default ListActivity;