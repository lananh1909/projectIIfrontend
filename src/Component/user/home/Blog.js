import React, { Component } from 'react';
import API from '../../API';

const API_URL = API + "file/";

const styles = {
    hoverStyle: {
        cursor: 'pointer'
    }
};

class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            blog: ""
        }
    }

    componentDidMount() {
        this.setState({
            blog: this.props.blog
        })
    }
    
    render() {
        const blog = this.state.blog;
        var image = ""
        if(blog.images){
            image = API_URL + blog.images[0];
        }
        return (
            <div className="row mb-1">
                <div style={{width: '150px', height: '150px', overflow: 'hidden', cursor: 'pointer'}}>
                    <div onClick={(e, blog) => this.props.onClickBlog(e, this.state.blog)} data-toggle="modal" data-target="#blog"><img src={image} alt="thumbnail" width="150px" /></div>
                </div>
                <div className="col">
                <div style={styles.hoverStyle} onClick={(e, blog) => this.props.onClickBlog(e, this.state.blog)} data-toggle="modal" data-target="#blog">{blog.title}</div>
                </div>
            </div>
        );
    }
}

export default Blog;