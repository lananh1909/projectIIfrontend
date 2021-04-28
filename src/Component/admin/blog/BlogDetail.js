import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../../../services/blog-service';

const API_URL = "http://localhost:8081/files/";


class BlogDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            blog: ""
        }
    }
    componentDidMount() {
        blogService.getBlogById(this.props.match.params.id).then(
            response => {
                this.setState({
                    blog: response.data
                })
            },
            error => {
                console.log(error.toString());
            }
        )
    }

    deleteBlog = (id) => {
        var r = window.confirm("Bạn có chắc muốn xóa bài viết này không?");
        if (r === true) {
            blogService.deleteBlog(id);
            this.props.history.push("/listBlog");
            window.location.reload();
        } else {
        }
        
    }

    render() {
        return (
            <div className="container">
                <div><Link to="/listBlog" className="btn btn-success mt-2 mb-2"><i className="fas fa-arrow-circle-left"></i> Back</Link></div>
                {this.state.blog.images?(
                    <img src={API_URL + this.state.blog.images[0]} alt={this.state.blog.title} className="img-fluid"/>
                ):<img src="/" alt="Không thể load ảnh" className="img-fluid"/>}
                
                <h3 style={{fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase'}}>{this.state.blog.title}</h3>
                <p style={{fontFamily: '"Vollkorn", serif', fontSize: '17px', whiteSpace: 'pre-wrap'}}>{this.state.blog.content}</p>
                {this.state.blog.images && this.state.blog.images.map((image, index) => {
                    if(index !== 0){
                        return (
                            <img key={index} src={API_URL + image} alt={this.state.blog.title} className="img-fluid"/>
                        )
                    } else {
                        return null;
                    }
                })}
                <div className="row">
                    <div className="col-sm-4">
                        <div><b>Người tạo: &nbsp; </b> {this.state.blog.user && this.state.blog.user.username}</div>
                    </div>
                    <div className="col-sm-4">
                        <div><b>Ngày tạo: &nbsp; </b> {new Date(this.state.blog.createdDate).toLocaleDateString("en-GB")}</div>
                    </div>
                </div>                                
                
                <div>Sửa đổi lần cuối bởi <i>{this.state.blog.modifiedBy}</i> lúc {this.state.blog.modifiedDate}</div>

                <div className="mt-5" style={{float:"right", width:"100%"}}>
                    <button type="button" className="btn btn-danger col-sm-6" onClick={(id) => this.deleteBlog(this.state.blog.id)}><i className="far fa-trash-alt mr-1"></i>Xóa</button>
                    <Link to={"/blog/edit/" + this.state.blog.id} className="btn btn-warning col-sm-6"><i className="fas fa-pencil-alt mr-1"></i>Sửa</Link>
                </div>
            </div>
        );
    }
}

export default BlogDetail;