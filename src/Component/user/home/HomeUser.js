import React, { Component } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import style from 'react-awesome-slider/dist/styles.css';
import { Link } from 'react-router-dom';
import activityService from '../../../services/activity-service';
import blogService from '../../../services/blog-service';
import BlogDetail from '../../admin/blog/BlogDetail';
import Activity from './Activity';
import Blog from './Blog';

class HomeUser extends Component {
    constructor(props){
        super(props);
        this.state = {
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

        const params = {
            page: 0,
            size: 10
        }
    
        blogService.getBlog(params)
        .then((response) => {
            const {blogs} = response.data;
            this.setState({
                blogs: blogs
            })
        }, 
        (error) => {
            console.log(error);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    onClickBlog = (e, blog) => {
        this.setState({
            blog: blog
        })
    }
    
    render() {
        const following = this.state.following;
        return (
            <div className="container">
                <AwesomeSlider cssModule={style} style={{height:"500px"}}>
                    <div data-src="/3.jpg"/>
                    <div data-src="/2.jpg"/>
                    <div data-src="/1.jpg"/>
                </AwesomeSlider>
                <div className="row mt-5">
                    <div className="col-sm-8">
                        <div className="card-titles text-primary border-bottom border-primary">
                            HOẠT ĐỘNG SẮP TỚI
                        </div>
                        <div className="mt-3">
                            {following.length === 0?(
                                <h6 className="row">Không có hoạt động mới</h6>
                            ):(
                                <div className="row">
                                    <div className="col">
                                        <Activity activity={following[0]}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="h-100">
                                        {following.map((item, index) => {
                                            if(index >= 1 && index <=8){
                                                return(<Link key={item.id} to={"/user/activity/" + item.id} className="d-block text-body">{item.title}</Link>)
                                            }
                                            return null;
                                        })}    
                                        </div>
                                    </div>
                                </div>
                            )}                        
                        
                        </div>

                        <div className="mt-3">
                            <div className="card-titles text-primary border-bottom border-primary">
                                THÔNG TIN GIỚI THIỆU
                            </div>
                            <img className="mt-2" src="/banner.jpg" alt="banner" width="100%"/>
                            <div className="card-text small" style={{whiteSpace:"pre-wrap"}}>
                                <div className="mt-1 font-weight-bold">QUỸ BẢO TRỢ TRẺ EM TỈNH ĐIỆN BIÊN HỖ TRỢ THỰC HIỆN QUYỀN TRẺ EM</div>
                                <div>1. Quỹ Bảo trợ trẻ em có nhiệm vụ huy động nguồn lực từ các tổ chức, cá nhân trong nước và quốc tế để hỗ trợ thực hiện các mục tiêu vì trẻ em trên địa bàn tỉnh Điện Biên</div>
                                <div>2. Quỹ Bảo trợ trẻ em tỉnh Điện Biên hỗ trợ cho trẻ em có hoàn cảnh đặc biệt, khó khăn, mồ côi, tàn tật, lang thang trên địa bàn toàn tỉnh thông qua Quỹ Bảo trợ trẻ em các cấp để thực hiện 4 nhóm quyền cơ bản của trẻ em gồm: (1) Quyền được sống, (2) Quyền được bảo vệ, (4) Quyền được tham gia với phương châm " TẬN TÂM - MINH BẠCH - KỊP THỜI - CÙNG THAM GIA "</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card-titles text-primary border-bottom border-primary">
                            TIN TỨC
                        </div>
                        <div className="mt-3 col">
                            {this.state.blogs && this.state.blogs.map((item) => {
                                return (<Blog key={item.id} blog={item} onClickBlog={(e, blog) => this.onClickBlog(e, item)}/>)
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
                </div>
            </div>
        );
    }
}

export default HomeUser;