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

class Blog extends Component {
    constructor(props){
        super(props);
        this.state={
            blog: ""
        }
    }

    componentDidMount() {
        this.setState({
            blog: this.props.blog
        })
    }
    

    render() {
        return (
            <div className="card">
                {this.state.blog.images?(
                    <img src={API_URL + this.state.blog.images[0]} alt={this.state.blog.title} className="card-img-top" />
                ):<img src="/" alt="Không thể load ảnh" className="card-img-top"/>}
                
                <div className="card-body">
                    <h4 className="card-title">{this.state.blog.title}</h4>
                    <p className="card-text" style={style}>{this.state.blog.content}</p>
                    <p className="card-text small font-italic">{this.state.blog.createdDate}</p>
                </div>
                <div className="btn-group btn-block" style={{float:"right"}}>
                    <button type="button" className="btn btn-danger col-sm-4" onClick={this.props.delete}><i className="far fa-trash-alt mr-1"></i>Xóa</button>
                    <Link to={"/blog/edit/" + this.state.blog.id} className="btn btn-warning col-sm-4"><i className="fas fa-pencil-alt mr-1"></i>Sửa</Link>
                    <Link to={"/blog/" + this.state.blog.id} className="btn btn-success col-sm-4"><i className="fas fa-info-circle mr-1"></i>Chi tiết</Link>
                </div>
            </div>
        );
    }
}

export default Blog;