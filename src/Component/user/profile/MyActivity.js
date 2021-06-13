import React, { Component } from 'react';
import attendService from '../../../services/attend-service';
import authService from '../../../services/auth-service';
import RegisterForm from '../activity/RegisterForm';
import Activity from '../home/Activity';

class MyActivity extends Component {
    constructor(props){
        super(props);
        this.state = {
            attends: [],
            attend: {},
            user: {}
        }
    }

    componentDidMount() {
        const user = authService.getCurrentUser();
        
        if(!user){
            window.location.replace("/login");  
        }

        this.setState({
            user: user
        })

        attendService.getByVolunteer()
        .then(
            response => {
                this.setState({
                    attends: response.data
                })
            },
            error => {
                console.log(error.toString());
            }
        )
    }

    onClickRegister = (e, attend) => {
        this.setState({
            attend: attend
        })
    }

    deleteAttend = (e, id) => {
        const r = window.confirm("Bạn có chắc xóa hoạt động này không?");
        if(r){
            attendService.deleteAttend(id, this.state.user && this.state.user.id);
            var tmp = [...this.state.attends];
            tmp = tmp.filter((item) => item.activity.id !== id);
            this.setState({
                attends: tmp
            })
        } else {

        }
        
    }
    

    render() {
        return (
            <div className="container">
                <div className="card-title"><i>Số hoạt động đã đăng ký:</i> {this.state.attends.length}</div>
                <div className="row mt-3">
                    {this.state.attends && this.state.attends.map((item, index) => {
                        return (
                            <div className="col-sm-4 mb-2">
                                <Activity activity={item.activity} key={item.activity.id}/>
                                <div className="col bg-light text-right pb-2">
                                    <button onClick={(e, attend) => this.onClickRegister(e, item)} data-toggle="modal" data-target="#attend" className="btn btn-success mt-3">{item.state===0?"Chờ phê duyệt":(item.state===1)?"Đã phê duyệt":"Đã hủy"}</button>
                                    <button disabled={new Date(item.activity.fromDate) <= new Date() || item.state === 1} className="btn btn-danger mt-3 ml-3" onClick={(e, id) => this.deleteAttend(e, item.activity && item.activity.id)}>Xóa</button>
                                </div>
                                
                            </div>
                        )
                    })}
                    <div id="attend" className="modal fade" role="dialog">
                        <div className="modal-dialog modal-xl">                                                       
                            <div className="modal-content">  
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal"><i className="fas fa-times"></i></button>                                
                                </div>  
                                <RegisterForm attend={this.state.attend} actId={this.state.attend.activity?this.state.attend.activity.id:"id"}/>
                            </div>
                        </div>                         
                    </div>
                </div>
            </div>
        );
    }
}

export default MyActivity;