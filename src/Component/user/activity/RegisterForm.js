import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import TextArea from "react-validation/build/textarea"
import AddressService from '../../../services/address-service';
import volunteerService from '../../../services/volunteer-service';
import attendService from '../../../services/attend-service';
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";

const required = value => {
    if(!value || value === "0"){
        return (
            <div className="alert alert-danger" role = "alert">
                This field is required!
            </div>
        )
    }
}

const override = css`
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    width: 120px;
    height: 120px;
    margin: -76px 0 0 -76px;
`;

class RegisterForm extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            province: "",
            district: "",
            provinces: "",
            districts: "",
            communes: "",
            commune: "",
            message: "", 
            theInputKey: "",
            fullname: "",
            birthDate: "",
            phoneNum: "",
            today: "",
            gender: "", 
            volunteer: "",
            skill: "",
            changeProfile: false,
            disabled: false,
            loading: false,
            actId: ""
        }
    }

    genState(){
        var volunteer = this.state.volunteer;
        if(volunteer){
            var commune = volunteer.commune;
            if(commune){
                //this.form.district.disabled = false;
                var formRegister = document.getElementById(this.state.actId);
                if(formRegister){
                    var dis = formRegister.querySelector(".district");
                    if(dis)
                        dis.disabled = false;
                    var com = formRegister.querySelector(".commune");
                    if(com)
                        com.disabled = false;
                }
                
                var district = commune.district;
                var province = district.province;
                AddressService.getProvinces().then(
                    response => {
                        this.setState({
                            provinces: response.data
                        });
                    }, 
                    error => {
                        console.log(error.toString());
                    }
                )
                AddressService.getDistricts(province.provinceId).then(
                    response => {
                        this.setState({
                            districts: response
                        })
                    }, 
                    error => {
                        console.log(error.toString());
                    }
                )
                AddressService.getCommunes(district.districtId).then(
                    response => {
                        this.setState({
                            communes: response
                        })
                    }, 
                    error => {
                        console.log(error.toString());
                    }
                )

                this.setState({
                    province: province.provinceId,
                    district: district.districtId,
                    commune: commune.communeId
                })
            }

            this.setState({ 
                fullname: volunteer.fullName,
                gender: volunteer.gender,
                phoneNum: volunteer.phoneNum,
                birthDate: volunteer.birthDate?this.valueDate(volunteer.birthDate):""
            })
            
        }
        
    }

    valueDate(date){
        var today = new Date(date);
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
      
        if(dd<10) {
            dd = '0'+dd
        } 
      
        if(mm<10) {
            mm = '0'+mm
        } 
      
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    componentDidUpdate(prevProps) {
        if(prevProps.attend !== this.props.attend){
            this.setState({
                volunteer: this.props.attend.volunteer,
                skill: this.props.attend.skill,
                actId: this.props.actId
            }, () => this.genState())
            if((this.props.attend.activity && new Date(this.props.attend.activity.fromDate) <= new Date()) || this.props.attend.state === 1){
                this.setState({
                    disabled: true
                })
            } else {
                this.setState({
                    disabled: false
                })
            }
        } else if(prevProps.actId !== this.props.actId){
            this.setState({
                actId: this.props.actId
            }, () => this.genState())
        }
    }

    componentDidMount() {
        if(!this.props.attend){
            volunteerService.getVolunteer().then(
                response => {
                    if(response.data){
                        this.setState({
                            volunteer: response.data
                        }, () => this.genState())
                    }
                }
            )
        } else {
            this.setState({
                volunteer: this.props.attend.volunteer,
                skill: this.props.attend.skill
            }, () => this.genState())
            if(new Date(this.props.attend.activity && this.props.attend.activity.fromDate) <= new Date()){
                this.setState({
                    disabled: true
                })
            } else {
                this.setState({
                    disabled: false
                })
            }
        }
        AddressService.getProvinces().then(
            response => {
                this.setState({
                    provinces: response.data
                });
            }, 
            error => {
                console.log(error.toString());
            }
        )
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
      
        if(dd<10) {
            dd = '0'+dd
        } 
      
        if(mm<10) {
            mm = '0'+mm
        } 
      
        today = yyyy + '-' + mm + '-' + dd;
        this.setState({
            today: today
        })
    }
    

    onSomethingChange = (name, event) => {
        this.setState({[name]: event.target.value});
        this.setState({
            changeProfile: true
        })
    }

    onSkillChange = (e) => {
        this.setState({
            skill: e.target.value
        })
    }

    onProvinceChange = event => {
        var provinceId = event.target.value;
        this.setState({
            province: provinceId
        })
        AddressService.getDistricts(provinceId).then(
            response => {
                this.setState({
                    districts: response
                })
            }, 
            error => {
                console.log(error.toString());
            }
        )
        var formRegister = document.getElementById(this.props.actId);
        if(formRegister){
            var district = formRegister.querySelector(".district");
            var commune = formRegister.querySelector(".commune");
            commune.disabled = true;
            this.setState({
                communes: []
            })
            if(provinceId !== "0"){
                district.disabled = false;
            } else {
                district.disabled = true;
            }  
        }         
    }  
    
    onDistrictChange = event => {
        var districtId = event.target.value;
        this.setState({
            district: districtId
        })
        AddressService.getCommunes(districtId).then(
            response => {
                this.setState({
                    communes: response
                })
            }, 
            error => {
                console.log(error.toString());
            }
        )

        var formRegister = document.getElementById(this.props.actId);
        if(formRegister){
            var commune = formRegister.querySelector(".commune");
            if(districtId !== "0"){
                commune.disabled = false;
            } else {
                commune.disabled = true;
            } 
        }
         
    }

    onReset = (e) => {
        e.preventDefault();
        var formRegister = document.getElementById(this.props.actId);
        var district = formRegister.querySelector(".district");
        var commune = formRegister.querySelector(".commune");
        commune.disabled = true;
        district.disabled = true;
        let randomString = Math.random().toString(36);
        this.setState({
            theInputKey: randomString,
            province: "",
            district: "",       
            commune: "",
            message: "",
            fullname: "",
            phoneNum: "",
            gender: "",
            birthDate: "",
            skill: ""            
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.form.validateAll();
        
        if(this.checkBtn.context._errors.length === 0){
            this.setState({
                loading: true
            })
            if(this.state.changeProfile){
                volunteerService.createVolunteer(this.state.fullname, this.state.phoneNum, this.state.birthDate, this.state.gender, this.state.commune)
                .then(
                    response => {
                        window.alert("Đã cập nhập thông tin!");
                    },
                    error => {
                        console.log(error.toString());
                        this.setState({
                            loading: false
                        })
                    }
                )
            }
            attendService.createAttend(this.props.actId, this.state.skill)
            .then(
                response => {
                    this.setState({
                        loading: false
                    }, () => {
                        window.alert("Gửi đơn đăng ký thành công!");
                        this.props.history.replace(window.location.pathname);  
                    })                    
                },
                error => {
                    console.log(error.toString());
                    this.setState({
                        loading: false
                    })
                }
            )
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Đơn đăng ký</h3></div>
                    <div className="card-body">
                        <fieldset disabled={this.state.disabled}>
                        <Form onSubmit={this.handleSubmit}
                        id={this.props.actId}
                        ref={c => {
                            this.form = c;
                        }}>
                        <div className="form-group">
                            <label className="small mb-1" htmlFor="fullname">Họ và tên</label>
                            <Input className="form-control py-4" 
                            name="fullname" 
                            key={this.state.theInputKey || '' }
                            type="text" 
                            placeholder="Họ và tên" 
                            value= {this.state.fullname}
                            onChange={(e) => this.onSomethingChange("fullname", e)} 
                            validations = {[required]}/>
                        </div>

                        <div className="form-row">
                            <div className="col-md-12">
                            <label htmlFor="gender" className="small mb-1">Giới tính</label>
                            <Select name="gender" className="custom-select" 
                            key={this.state.theInputKey || '' }
                            value={this.state.gender}
                            onChange={(e) => this.onSomethingChange("gender", e)} 
                            validations={[required]}>
                                <option value="0">Chọn giới tính</option>
                                <option value="Nam" key="boy">Nam</option>
                                <option value="Nữ" key="girl">Nữ</option>
                                <option value="Khác" key="other">Khác</option>
                            </Select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="fromDate">Ngày sinh</label>
                                    <Input className="form-control py-4" 
                                    type="date" 
                                    max={this.state.today}
                                    key={this.state.theInputKey || '' }
                                    value={this.state.birthDate}
                                    onChange={(e) => this.onSomethingChange("birthDate", e)} 
                                    validations = {[required]}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="phoneNum">Số điện thoại</label>
                                    <Input className="form-control py-4" 
                                    name="phoneNum"
                                    key={this.state.theInputKey || '' }
                                    type="number" 
                                    placeholder="Số điện thoại" 
                                    value= {this.state.phoneNum}
                                    onChange={(e) => this.onSomethingChange("phoneNum", e)} 
                                    validations = {[required]}/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="text-xs-left">Địa chỉ</div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="province">Tỉnh/Thành phố</label>
                                <Select name="province"
                                onChange={this.onProvinceChange} 
                                key={this.state.theInputKey || '' }
                                value={this.state.province}
                                className="custom-select province" 
                                validations={[required]}>
                                <option value="0">Chọn Tỉnh</option>
                                {this.state.provinces &&
                                this.state.provinces.map((x, index) => {
                                    return (
                                        <option key={index} value={x.provinceId}>{x.provinceName}</option>
                                    )
                                })}
                                </Select>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="district">Quận/Huyện</label>
                                <Select name="district"
                                onChange={this.onDistrictChange} 
                                key={this.state.theInputKey || '' }
                                value={this.state.district}
                                className="custom-select district" disabled="disabled"
                                validations={[required]}>
                                <option value="0">Chọn Huyện</option>
                                {this.state.districts &&
                                this.state.districts.map((x, index) => {
                                    return (
                                        <option key={index} value={x.districtId}>{x.districtName}</option>
                                    )
                                })}
                                </Select>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="commune">Xã/Phường</label>
                                <Select name="commune"
                                className="custom-select commune"
                                disabled="disabled" 
                                value={this.state.commune}
                                key={this.state.theInputKey || '' }
                                onChange={(e) => this.onSomethingChange("commune", e)} 
                                validations={[required]}> 
                                <option value="0">Chọn Xã</option>
                                {this.state.communes &&
                                this.state.communes.map((x, index) => {
                                    return (
                                        <option key={index} value={x.communeId}>{x.communeName}</option>
                                    )
                                })}
                                </Select>
                            </div>
                            </div>
                        </div>  
                        <div className="form-group">
                            <label className="small mb-1" htmlFor="content">Kỹ năng, kinh nghiệm</label>
                            <TextArea className="form-control py-4" rows="3"
                            type="text" 
                            name="content"
                            placeholder="Nhập nội dung" 
                            key={this.state.theInputKey || '' }
                            value = {this.state.skill}
                            onChange={(e) => this.onSkillChange(e)} 
                            validations = {[required]}></TextArea>
                        </div>                                             
                        <div className="form-row mt-3">
                            <div className="col-md-6">
                            <button className="btn btn-primary btn-block" type="submit">
                                <span>Gửi</span>
                            </button>
                            </div>
                            <div className="col-md-6">
                            <button className="btn btn-danger btn-block" type="reset" onClick={this.onReset}>Làm mới</button>
                            </div>
                        </div>

                        <CheckButton
                            style={{display: "none"}}
                            ref={c=> {
                                this.checkBtn = c;
                            }}
                        />
                        </Form>
                        </fieldset>
                    </div>
                </div>
                </div>
                <div className={this.state.loading ? 'parentDisable' : ''} width="100%">
                    <RingLoader loading={this.state.loading} css={override} color="#007bff"/>
                </div>
                              
            </div>
        );
    }
}

export default RegisterForm;