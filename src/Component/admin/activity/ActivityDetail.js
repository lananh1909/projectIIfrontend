import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import activityService from '../../../services/activity-service';
import attendService from '../../../services/attend-service';
import Volunteer from './Volunteer';
import API from '../../API';
import { connect } from 'react-redux';
import RegisterForm from '../../user/activity/RegisterForm';

const API_URL = API + "file/";

const mapStateToProps = (state, ownProps) => {
    return {
        admin: state.role,
        login: state.isLogin
    }
}

class ActivityDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            activity: "",
            address: "",
            volunteers: [],
            attend: "",
            isAvailable: true
        }
    }

    
    componentDidMount() {
        activityService.getActivityById(this.props.match.params.id).then(
            response => {
                this.setState({
                    activity: response.data
                }, this.getVolunteer)
            },
            error => {
                console.log(error.toString());
            }
        )
    }

    getVolunteer(){
        if(this.props.admin){
            attendService.getAttends(this.state.activity.id).then(
                response => {
                    this.setState({
                        volunteers: response.data
                    })
                },
                error => {
                    console.log(error.toString());
                }
            )
        }   
        if(new Date(this.state.activity.fromDate) <= new Date()){
            this.setState({
                isAvailable: false
            })
        }     
        this.setState({
            address: this.toStringCommune(this.state.activity.commune)
        });
    }

    toStringCommune(commune){
        if(commune === null) return "";
        var district = commune.district;
        var province = district.province;
        return commune.communeName + ", " + district.districtName + ", " + province.provinceName;       
    }

    deleteActivity = (id) => {
        var r = window.confirm("Bạn có chắc muốn xóa hoạt động này không?");
        if (r === true) {
            activityService.deleteActivity(id);
            this.props.history.push("/listActivity");
            window.location.reload();
        } else {
        }
        
    }

    deleteAttend = (id) => {
        var r = window.confirm("Bạn có chắc muốn xóa tình nguyện viên này không?");
        if (r === true) {
            attendService.deleteAttend(this.state.activity.id, id);
            var v = this.state.volunteers.filter(item => item.id !== id);
            this.setState({
                volunteers: v
            })
        } else {
        }
    }

    showAttend = (a) => {
        this.setState({
            attend: a
        })
    }
    
    closeDetail = (e) => {
        e.preventDefault();
        this.setState({
            attend: ""
        })
    }

    onClickRegister = (e) => {
        if(!this.props.login){
            e.preventDefault();
            window.alert("Bạn cần đăng nhập để đăng ký hoạt động!");
            this.props.history.push("/login");
            window.location.reload();
        }
    }

    render() {
        return (
            <div className="container">
                <div><Link to={this.props.admin?"/listActivity":"/volunteer/all"} className="btn btn-success mt-2 mb-2"><i className="fas fa-arrow-circle-left"></i> Back</Link></div>
                {this.state.activity.image?(
                    <img src={API_URL + this.state.activity.image.id} alt={this.state.activity.image.name} className="img-fluid"/>
                ):<img src="/" alt="Không thể load ảnh" className="img-fluid"/>}
                
                <div className="mt-2 mb-2">Topic: <mark>#{this.state.activity.topic && this.state.activity.topic.topicName}</mark></div>
                <h3 style={{fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase'}}>{this.state.activity.title}</h3>
                <p style={{fontFamily: '"Vollkorn", serif', fontSize: '17px', whiteSpace: 'pre-wrap'}}>{this.state.activity.content}</p>
                <div className="font-weight-bold">Thời gian:</div>
                <div className="row ml-5">
                    <div className="col-sm-4">
                        <div>Từ ngày: {new Date(this.state.activity.fromDate).toLocaleDateString('en-GB')}</div>
                    </div>
                    <div className="col-sm-4">
                        <div>Đến ngày: {new Date(this.state.activity.toDate).toLocaleDateString('en-GB')}</div>
                    </div>
                </div>
                <div className="font-weight-bold">Địa điểm:  </div>
                <div className="ml-5"> 
                    <div>{this.state.activity.location}</div>
                    <div>{this.state.address}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div><b>Người tạo: &nbsp; </b> {this.state.activity.user && this.state.activity.user.username}</div>
                    </div>
                    <div className="col-sm-4">
                        <div><b>Ngày tạo: &nbsp; </b> {new Date(this.state.activity.createdDate).toLocaleDateString("en-GB")}</div>
                    </div>
                </div>                
                
                <div className="font-weight-bold">Người đăng ký: <span className="font-weight-light">Tổng số người đăng ký {this.state.volunteers.length}</span></div>
                {this.props.admin?(
                    <div>
                    <div className="row">
                        <div className="col">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Họ và tên</th>
                                    <th scope="col">Ngày sinh</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.volunteers && this.state.volunteers.map((v, index) => {
                                        return (
                                            <tr key={v.volunteer.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{v.volunteer.fullName}</td>
                                                <td>{new Date(v.volunteer.birthDate).toLocaleDateString('en-GB')}</td>
                                                <td>{this.toStringCommune(v.volunteer.commune)}</td>
                                                <td>
                                                <div className="btn-group btn-block" style={{float:"right"}}>
                                                    <button type="button" className="btn btn-danger col-sm-4" onClick={(id) => this.deleteAttend(v.volunteer.id)}><i className="far fa-trash-alt mr-1"></i></button>
                                                    <button type="button" className="btn btn-success col-sm-4" onClick={(a) => this.showAttend(v)}><i className="fas fa-info-circle"></i></button>
                                                </div>
                                                </td>                                    
                                            </tr>
                                        )
                                    })}                        
                                    
                                </tbody>
                            </table>
                        </div>
                        {this.state.attend && (
                            <div className="col-sm-4" id="detail">
                                <button onClick={(e) => this.closeDetail(e)}><i className="fas fa-arrow-circle-left"></i> Back</button>
                                <Volunteer attend={this.state.attend}/>
                            </div>
                        )}                   
                    </div>

                    <div>Sửa đổi lần cuối bởi <i>{this.state.activity.modifiedBy}</i> lúc {this.state.activity.modifiedDate}</div>
                    <div className="mt-5" style={{float:"right", width:"100%"}}>
                        <button type="button" className="btn btn-danger col-sm-6" onClick={(id) => this.deleteActivity(this.state.activity.id)}><i className="far fa-trash-alt mr-1"></i>Xóa</button>
                        <Link to={"/activity/edit/" + this.state.activity.id} className="btn btn-warning col-sm-6"><i className="fas fa-pencil-alt mr-1"></i>Sửa</Link>
                    </div>
                    </div>
                ):(
                    <div>
                        <button disabled={!this.state.isAvailable} onClick={(e) => this.onClickRegister(e)} data-toggle="modal" data-target="#attend" className="btn btn-success col-sm-4 mt-3">Đăng Ký</button>
                        <div id="attend" className="modal fade" role="dialog">
                            <div className="modal-dialog modal-xl">                                                       
                                <div className="modal-content">  
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal"><i className="fas fa-times"></i></button>                                
                                    </div>  
                                    <RegisterForm actId={this.state.activity.id}/>
                                </div>
                            </div>                         
                        </div>
                    </div>
                )}       
            </div>
        );
    }
}

export default connect(mapStateToProps)(ActivityDetail);