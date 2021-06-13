import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select"
import AddressService from '../../../services/address-service';import volunteerService from '../../../services/volunteer-service';
;

const required = value => {
    if(!value || value === "0"){
        return (
            <div className="alert alert-danger" role = "alert">
                This field is required!
            </div>
        )
    }
}

class UpdateProfile extends Component {
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
            volunteer: ""
        }
    }

    genState(){
        var volunteer = this.state.volunteer;
        var commune = volunteer.commune;
        if(commune){
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
        document.getElementById("district").disabled = false;
        document.getElementById("commune").disabled = false;
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

    componentDidMount() {
        volunteerService.getVolunteer().then(
            response => {
                if(response.data){
                    this.setState({
                        volunteer: response.data
                    }, () => this.genState())
                }
            }
        )
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

        var district = document.getElementById("district");
        var commune = document.getElementById("commune");
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

        var commune = document.getElementById("commune");
        if(districtId !== "0"){
            commune.disabled = false;
        } else {
            commune.disabled = true;
        }  
    }

    onReset = (e) => {
        e.preventDefault();
        var commune = document.getElementById("commune");
        var district = document.getElementById("district");
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
            birthDate: ""
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.form.validateAll();
        if(this.checkBtn.context._errors.length === 0){
            volunteerService.createVolunteer(this.state.fullname, this.state.phoneNum, this.state.birthDate, this.state.gender, this.state.commune)
            .then(
                response => {
                    window.alert("Đã cập nhập thông tin!");
                    window.location.replace('/');
                },
                error => {
                    console.log(error.toString());
                }
            )
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Cập nhập thông tin</h3></div>
                    <div className="card-body">
                        <Form onSubmit={this.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}>
                        <div className="form-group">
                            <label className="small mb-1" htmlFor="fullname">Họ và tên</label>
                            <Input className="form-control py-4" 
                            id="fullname" 
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
                                    id="birthDate" 
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
                                    id="phoneNum" 
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
                                <Select name="province" id="province" 
                                onChange={this.onProvinceChange} 
                                key={this.state.theInputKey || '' }
                                value={this.state.province}
                                className="custom-select" 
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
                                <Select name="district" id="district" 
                                onChange={this.onDistrictChange} 
                                key={this.state.theInputKey || '' }
                                value={this.state.district}
                                className="custom-select" disabled="disabled"
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
                                <Select name="commune" id="commune" 
                                className="custom-select"
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
                        <div className="form-row mt-3">
                            <div className="col-md-6">
                            <button className="btn btn-primary btn-block" type="submit">
                                <span>Lưu lại</span>
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
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default UpdateProfile;