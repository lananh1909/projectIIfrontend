import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import React, { Component } from 'react';
import blogService from '../../../services/blog-service';
import Blog from './Blog';

const pageSizes = [3, 6, 9];

class ListBlog extends Component {
    constructor(props){
        super(props);
        this.state = {
            blogs: [],
            table: false,
            searchTitle: "",
            page: 1,
            count: 0,
            sortConfig: "",
            pageSize: 3
        }
    }

    componentDidMount() {
        this.retrieveBlog();
    }

    deleteBlog = (id) => {
        var r = window.confirm("Bạn có chắc muốn xóa bài viết này không?");
        if (r === true) {
            blogService.deleteBlog(id);
            var n  = this.state.blogs.filter(item => item.id !== id);
            this.setState({
                blogs: n
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
            const myData = [].concat(this.state.blogs).sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'up' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'up' ? 1 : -1;
                }
                return 0;
            });
            this.setState({
                blogs: myData
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

    onChangeSearchTitle = (e) => {
        const search = e.target.value;
        this.setState({
            searchTitle: search
        }, ()=>this.findByTitle())
    };

    findByTitle = () => {
        this.setState({
            page: 1
        })
        this.retrieveBlog();
    };

    handlePageChange = (event, value) => {
        this.setState({
            page: value
        }, () => {this.retrieveBlog()})
    };

    handlePageSizeChange = (event) => {
        this.setState({
            pageSize: event.target.value,
            page: 1
        }, () => {this.retrieveBlog()})
    };

    getRequestParams = (searchTitle, page, pageSize) => {
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
    
        return params;
    };

    retrieveBlog = () => {
        const params = this.getRequestParams(this.state.searchTitle, this.state.page, this.state.pageSize);
    
        blogService.getBlog(params)
        .then((response) => {
            const {blogs, totalPages } = response.data;
            this.setState({
                blogs: blogs,
                count: totalPages
            })
        }, 
        (error) => {
            console.log(error);
        })
        .catch((e) => {
            console.log(e);
        });
    }
    

    render() {
        return (
            <div className="container">
                <div><Link to="/createBlog" className="btn btn-primary mt-5"><i className="far fa-calendar-plus mr-1"></i>Thêm</Link></div>  
                <button className="btn btn-secondary mt-1 mb-1" onClick={() => this.toTable()}>{this.state.table?"Card": "Table"}</button>

                <div className="input-group mb-3 mt-3">
                    <input type="text"
                    className="from-control"
                    placeholder="Tìm kiếm"
                    value={this.state.searchTitle}
                    onChange={this.onChangeSearchTitle}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.findByTitle}>Search</button>
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

                {this.state.table?(
                    <table className="table table-striped">
                        <thead style={{background: 'pink'}}>
                            <tr>
                            <th scope="col" className="align-middle">STT</th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("title")}>Tiêu đề <i id="title" className="fas icon" style={{display: 'none'}}></i></th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("createdBy")}>Người tạo <i id="createdBy" className="fas icon" style={{display: 'none'}}></i></th>
                            <th scope="col" className="align-middle" onClick={(name) => this.sortTable("createdDate")}>Ngày tạo <i id="createdDate" className="fas icon" style={{display: 'none'}}></i></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.blogs && this.state.blogs.map((act, index) => {
                                return (
                                    <tr key={act.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{act.title}</td>
                                        <td>{act.createdBy}</td>
                                        <td>{act.createdDate}</td>
                                        <td>
                                        <div className="btn-group btn-block" style={{float:"right"}}>
                                            <button type="button" className="btn btn-danger col-sm-4" onClick={(id) => this.deleteBlog(act.id)}><i className="far fa-trash-alt mr-1"></i></button>
                                            <Link to={"/blog/edit/" + act.id} className="btn btn-warning col-sm-4"><i className="fas fa-pencil-alt mr-1"></i></Link>
                                            <Link to={"/blog/" + act.id} className="btn btn-success col-sm-4"><i className="fas fa-info-circle mr-1"></i></Link>
                                        </div>
                                        </td>                                    
                                    </tr>
                                )
                            })}                        
                            
                        </tbody>
                    </table>
                ):(
                    <div>
                        <div className="row">
                            <div className="col-sm-2" style={{paddingTop: '6px'}}>Xắp xếp theo: </div>
                            <div className="col-sm-10">
                                <div className="btn-group">
                                    <button className="btn btn-primary" onClick={(name) => this.sortTable("createdDate")}>Thời gian <i id="createdDate" className="fas fa-sort-up icon" style={{display: 'none'}}></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="card-columns">
                        {this.state.blogs && (this.state.blogs.map((act) => 
                                <Blog blog={act} delete={(id) => this.deleteBlog(act.id)} key={act.id}/>
                            )
                        )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ListBlog;