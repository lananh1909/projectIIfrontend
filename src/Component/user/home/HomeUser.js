import React, { Component } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import style from 'react-awesome-slider/dist/styles.css';
import { Link } from 'react-router-dom';
import activityService from '../../../services/activity-service';
import blogService from '../../../services/blog-service';
import BlogDetail from '../../admin/blog/BlogDetail';
import CustomMap from '../activity/Map';
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
                            HO???T ?????NG S???P T???I
                        </div>
                        <div className="mt-3">
                            {following.length === 0?(
                                <h6 className="row">Kh??ng c?? ho???t ?????ng m???i</h6>
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
                                TH??NG TIN GI???I THI???U
                            </div>
                            <img className="mt-2" src="/banner.jpg" alt="banner" width="100%"/>
                            <div className="card-text small mb-3" style={{whiteSpace:"pre-wrap"}}>
                                <div className="mt-1 font-weight-bold">QU??? B???O TR??? TR??? EM T???NH ??I???N BI??N H??? TR??? TH???C HI???N QUY???N TR??? EM</div>
                                <div>1. Qu??? B???o tr??? tr??? em c?? nhi???m v??? huy ?????ng ngu???n l???c t??? c??c t??? ch???c, c?? nh??n trong n?????c v?? qu???c t??? ????? h??? tr??? th???c hi???n c??c m???c ti??u v?? tr??? em tr??n ?????a b??n t???nh ??i???n Bi??n</div>
                                <div>2. Qu??? B???o tr??? tr??? em t???nh ??i???n Bi??n h??? tr??? cho tr??? em c?? ho??n c???nh ?????c bi???t, kh?? kh??n, m??? c??i, t??n t???t, lang thang tr??n ?????a b??n to??n t???nh th??ng qua Qu??? B???o tr??? tr??? em c??c c???p ????? th???c hi???n 4 nh??m quy???n c?? b???n c???a tr??? em g???m: (1) Quy???n ???????c s???ng, (2) Quy???n ???????c b???o v???, (4) Quy???n ???????c tham gia v???i ph????ng ch??m " T???N T??M - MINH B???CH - K???P TH???I - C??NG THAM GIA "</div>
                            </div>
                            <div style={{height: '500px'}}>
                                <CustomMap/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card-titles text-primary border-bottom border-primary">
                            TIN T???C
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