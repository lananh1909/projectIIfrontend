import React, { Component } from 'react';
import { Pagination } from '@material-ui/lab';
import activityService from '../../../services/activity-service';
import blogService from '../../../services/blog-service';
import Blog from '../home/Blog';
import BlogDetail from '../../admin/blog/BlogDetail';
import { Link } from 'react-router-dom';

class ListBlog extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchTitle: "",
            page: 1,
            count: 0,
            pageSize: 15,
            following: [],
            blogs: [],
            blog: {}
        }
    }

    componentDidMount() {
        activityService.getFollowing().then(
            response => {
                this.setState({
                    following: response.data
                })
            },
            error => {
                console.log(error);
            }
        )
        this.getBlogs();        
    }

    getBlogs(){
        const params = {
            title: this.state.searchTitle,
            page: this.state.page - 1,
            size: this.state.pageSize
        }
    
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

    sort = () => {
        var btnSort = document.getElementById("sort");
        btnSort.classList.add("btn-secondary");
        btnSort.classList.add("text-white");
        
        const myData = [].concat(this.state.blogs).sort((a, b) => {
            if (a["createdDate"] > b["createdDate"]) {
               return -1;
            }
            if (a["createdDate"] < b["createdDate"]) {
                return 1;
            }
            return 0;
        });
        this.setState({
            blogs: myData
        })
    }
    

    onChangeSearchTitle = (e) => {
        this.setState({
            searchTitle: e.target.value
        }, () => this.getBlogs())
    }

    handlePageChange = (event, value) => {
        this.setState({
            page: value
        }, () => {this.getBlogs()})
    };

    onClickBlog = (e, blog) => {
        this.setState({
            blog: blog
        })
    }
    
    render() {
        const following = this.state.following;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="row">
                            <div className="col-sm-8">
                                <input onChange={this.onChangeSearchTitle} value={this.state.searchTitle} className="form-control" placeholder="Nhập từ khóa"></input>
                            </div>
                            <div className="col-sm-4 text-right">
                                <span className="card-text">Xắp xếp </span>
                                <button id="sort" className="btn btn-outline-secondary" onClick={this.sort}>Thời gian</button>
                            </div>
                        </div>
                    </div>   
                </div> 
                <div className="row mt-3">
                    <div className="col-sm-8">
                        <div className="card-titles text-white bg-info p-1">
                            <i className="fas fa-book-open"></i>
                             BÀI VIẾT
                        </div>
                        <div className="mt-2 col">
                            {this.state.blogs && this.state.blogs.map((item, index) => {
                                return(
                                    <div className="mt-1">
                                        <Blog key={item.id} blog={item} onClickBlog={(e, blog) => this.onClickBlog(e, item)}/>
                                    </div>
                                )
                            })}
                            <div id="blog" className="modal fade" role="dialog">
                                <div className="modal-dialog modal-xl">                                                       
                                    <div className="modal-content">  
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal"><i className="fas fa-times"></i></button>                                
                                        </div>  
                                        <BlogDetail blog={this.state.blog}/>
                                    </div>
                                </div>                         
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card-titles text-white bg-info p-1">
                            <i className="fas fa-newspaper"></i>
                             HOẠT ĐỘNG SẮP TỚI
                        </div>
                        <div className="mt-2">
                            {following.length === 0?(
                                <h6 className="col">Không có hoạt động mới</h6>
                            ):(
                                <div>
                                    {following.map((item, index) => {
                                        return(<Link key={item.id} to={"/user/activity/" + item.id} className="d-block text-body p-1">{item.title}</Link>)
                                    })}    
                                </div>
                            )}   
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
        );
    }
}

export default ListBlog;