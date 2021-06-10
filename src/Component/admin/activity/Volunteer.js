import React, { Component } from 'react';

class Volunteer extends Component {
    constructor(props){
        super(props);
        this.state = {
            attend: ""
        }
    }
    componentDidMount() {
        this.setState({
            attend: this.props.attend
        })
    }
    componentDidUpdate(prevProps) {
        if(prevProps.attend !== this.props.attend)
            this.setState({
                attend: this.props.attend
            })
    }
    
    render() {
        const attend = this.state.attend;
        return (
            <div>
                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Họ và tên</label>
                        <div className="border rounded pl-2">{attend.volunteer && attend.volunteer.fullName}</div>
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Ngày sinh</label>
                        <div className="border rounded pl-2">{attend.birthDate}</div>
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Số điện thoại</label>
                        <div className="border rounded pl-2">{attend.volunteer && attend.volunteer.phoneNum}</div>
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Địa chỉ</label>
                        <div className="border rounded pl-2">{attend.address}</div>
                    </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Kĩ năng</label>
                        <div className="border rounded pl-2">{attend.skill?attend.skill: "Không có"}</div>
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Thời gian đăng ký</label>
                        <div className="border rounded pl-2">{new Date(attend.attendTime).toLocaleDateString("en-GB")}</div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Volunteer;