import React, { Component } from 'react';

class UserDetail extends Component {
    toStringCommune(commune){
        if(commune === null) return "";
        var district = commune.district;
        var province = district.province;
        return commune.communeName + ", " + district.districtName + ", " + province.provinceName;       
    }

    render() {
        const volunteer = this.props.user.volunteer;
        return (
            <div>
                <div id={"myModal" + this.props.user.id} className="modal fade" role="dialog">
                    <div className="modal-dialog">                        
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title float-left">Thông tin user</h4>
                                <button type="button" className="close" data-dismiss="modal"><i className="fas fa-times"></i></button>                                
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div className="small mb-1">
                                                User ID
                                            </div>
                                            <div className="form-control">{this.props.user.id}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div className="small mb-1">
                                                Role
                                            </div>
                                            <div className="form-control">{this.props.user.role.roleName}</div>
                                        </div>
                                    </div>
                                </div>                                
                                <div className="form-group">
                                    <div className="small mb-1">
                                        Username
                                    </div>
                                    <div className="form-control">{this.props.user.username}</div>
                                </div>
                                <div className="form-group">
                                    <div className="small mb-1">
                                        Email
                                    </div>
                                    <div className="form-control">{this.props.user.email}</div>
                                </div>  
                                {!volunteer?this.props.user.role.id === 2?(
                                    <div>Chưa cập nhập thông tin</div>
                                ):(<div>
                                </div>):(<div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="small mb-1">
                                                    Họ và tên
                                                </div>
                                                <div className="form-control">{volunteer.fullName}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="small mb-1">
                                                    Ngày sinh
                                                </div>
                                                <div className="form-control">{new Date(volunteer.birthDate).toLocaleDateString("en-GB")}</div>
                                            </div>
                                        </div>
                                    </div>   
                                    <div className="form-group">
                                        <div className="small mb-1">
                                            Địa chỉ
                                        </div>
                                        <div className="form-control">{this.toStringCommune(volunteer.commune)}</div>
                                    </div>
                                    <div className="form-group">
                                        <div className="small mb-1">
                                            Số điện thoại
                                        </div>
                                        <div className="form-control">{volunteer.phoneNum}</div>
                                    </div>
                                    <div className="form-group">
                                        <div className="small mb-1">
                                            Số hoạt động đã đăng ký
                                        </div>
                                        <div className="form-control">{volunteer.numAttend}</div>
                                    </div>
                                </div>)}                              
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDetail;