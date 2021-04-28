import React, { Component } from 'react';

class Volunteer extends Component {
    constructor(props){
        super(props);
        this.state = {
            volunteer: "",
            skill: "",
            time: ""
        }
    }
    componentDidMount() {
        this.setState({
            volunteer: this.props.attend.volunteer,
            skill: this.props.attend.skill,
            time: this.props.attend.attendTime
        })
    }
    componentDidUpdate(prevProps) {
        if(prevProps.attend !== this.props.attend)
            this.setState({
                volunteer: this.props.attend.volunteer,
                skill: this.props.attend.skill,
                time: this.props.attend.attendTime
            })
    }
    

    toStringCommune(commune){
        var district = commune.district;
        var province = district.province;
        return commune.communeName + ", " + district.districtName + ", " + province.provinceName;       
    }
    render() {
        return (
            <div>
                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Họ và tên</label>
                        <div className="border rounded pl-2">{this.state.volunteer.fullName}</div>
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Ngày sinh</label>
                        <div className="border rounded pl-2">{new Date(this.state.volunteer.birthDate).toLocaleDateString("en-GB")}</div>
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Số điện thoại</label>
                        <div className="border rounded pl-2">{this.state.volunteer.phoneNum}</div>
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Địa chỉ</label>
                        <div className="border rounded pl-2">{this.state.volunteer.commune && this.toStringCommune(this.state.volunteer.commune)}</div>
                    </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Kĩ năng</label>
                        <div className="border rounded pl-2">{this.state.skill?this.state.skill: "Không có"}</div>
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label className="small mb-1">Thời gian đăng ký</label>
                        <div className="border rounded pl-2">{new Date(this.state.time).toLocaleDateString("en-GB")}</div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Volunteer;