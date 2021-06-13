import React, { Component } from 'react';
import AddressService from '../../../services/address-service'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import ActivityService from "../../../services/activity-service";
import TopicService from "../../../services/topic-service";
import UploadFilesService from '../../../services/files-service';
import TextArea from "react-validation/build/textarea"

const required = value => {
    if(!value || value === "0"){
        return (
            <div className="alert alert-danger" role = "alert">
                This field is required!
            </div>
        )
    }
}

class CreateActivity extends Component {
        constructor(props){
        super(props);
        this.onReset = this.onReset.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);
        this.onFromDateChange = this.onFromDateChange.bind(this);
        this.loading = false;
        this.state = {
            province: "",
            district: "",
            provinces: "",
            districts: "",
            communes: "",
            title: "",
            content: "",            
            commune: "",
            location: "",
            topic: "",
            topics: "",
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "", 
            image: "",
            fromDate: "",
            toDate: "",
            today: "",
            theInputKey: ""
        }
    }
    selectFile = (event) => {
        this.setState({
            selectedFiles: event.target.files
        })
    }
    
    upload(e){
        e.preventDefault();
        this.form.validateAll();
        if(this.checkBtn.context._errors.length === 0){
            if(this.state.selectedFiles){
                var currentFile = this.state.selectedFiles[0];

                this.setState({
                    progress: 0,
                    currentFile: currentFile
                });
                UploadFilesService.upload(currentFile)
                .then(
                    response => {
                        if(response.data === "File too large!"){
                            this.setState({
                                progress: 0,
                                message: "File too large!",
                                currentFile: undefined
                            })
                        } else {
                            this.setState({
                                image: response.data
                            }, () => {
                                this.handleAdd(e);
                            })
                        }
                    },
                    error => {
                        this.setState({
                            progress: 0,
                            message: "Không thể upload file!",
                            currentFile: undefined
                        });
                }
                ).catch(() => {
                    this.setState({
                        progress: 0,
                        message: "Không thể upload file!",
                        currentFile: undefined
                    });
                });
            } else {
                this.setState({
                    progress: 0,
                    message: "Chọn ảnh!",
                    currentFile: undefined
                });
            }
            
        }
    }    

    onSomethingChange = (name, event) => {
        this.setState({[name]: event.target.value});
    }

    componentDidMount() {
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

        TopicService.getTopic().then(
            response => {
                this.setState({
                    topics: response.data
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
            today: today,
            fromDate: today,
            toDate: today
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
        this.loading = false;
        let randomString = Math.random().toString(36);
        this.setState({
            theInputKey: randomString,
            province: "",
            district: "",
            title: "",
            content: "",            
            commune: "",
            location: "",
            topic: "",
            selectedFiles: undefined,
            currentFile: undefined,
            fromDate: this.state.today,
            toDate: this.state.today,
            image: "",
            message: ""
        })
    }
    
    handleAdd(e){
        if(this.state.image !== ""){
            ActivityService.addActivity(this.state.title, this.state.content, this.state.location, this.state.commune, this.state.topic, this.state.image.id, this.state.fromDate, this.state.toDate)
            .then(
                response => {
                    window.alert("Đã tạo hoạt động thành công!");
                    window.location.replace("/listActivity");
                },
                error => {
                    console.log(error.toString());
                }
            )
            
        }
        
    }

    onFromDateChange(e){
        this.setState({
            fromDate: e.target.value,
            toDate: e.target.value
        });        
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Tạo hoạt động</h3></div>
                    <div className="card-body">
                        <Form onSubmit={this.upload}
                        ref={c => {
                            this.form = c;
                        }}>
                        <div className="form-row">
                            <div className="col-md-12">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="title">Tiêu đề</label>
                                <Input className="form-control py-4" 
                                id="title" 
                                key={this.state.theInputKey || '' }
                                type="text" 
                                placeholder="Nhập tiêu đề" 
                                value= {this.state.title}
                                onChange={(e) => this.onSomethingChange("title", e)} 
                                validations = {[required]}/>
                            </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small mb-1" htmlFor="content">Nội dung</label>
                            <TextArea className="form-control py-4" rows="3"
                            id="content" type="text" 
                            placeholder="Nhập nội dung" 
                            key={this.state.theInputKey || '' }
                            value = {this.state.content}
                            onChange={(e) => this.onSomethingChange("content", e)} 
                            validations = {[required]}></TextArea>
                        </div>
                        <div className="form-group">
                            <div className="text-xs-left">Địa điểm tổ chức</div>
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
                        <div className="form-row">
                            <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="fromDate">Từ ngày</label>
                                <Input className="form-control py-4" 
                                id="fromDate" 
                                type="date" 
                                key={this.state.theInputKey || '' }
                                value={this.state.fromDate}
                                min={this.state.today}
                                onChange={this.onFromDateChange} 
                                validations = {[required]}/>
                            </div>
                            </div>

                            <div className="col-md-6">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="toDate">Đến ngày</label>
                                <Input className="form-control py-4" 
                                id="toDate" 
                                type="date" 
                                key={this.state.theInputKey || '' }
                                value={this.state.toDate}
                                min={this.state.fromDate}
                                onChange={(e) => this.onSomethingChange("toDate", e)} 
                                validations = {[required]}/>
                            </div>
                            </div>
                        </div>                        

                        <div className="form-group">
                            <label className="small mb-1" htmlFor="location">Địa chỉ cụ thể</label>
                            <Input className="form-control py-4" 
                            id="location" type="text" 
                            key={this.state.theInputKey || '' }
                            placeholder="Nhập địa chỉ" 
                            value={this.state.location}
                            onChange={(e) => this.onSomethingChange("location", e)}
                            validations={[required]}/>
                        </div>
                        <div className="form-row">
                            <div className="col-md-12">
                            <label htmlFor="topic" className="small mb-1">Chọn chủ đề</label>
                            <Select name="topic" className="custom-select" 
                            key={this.state.theInputKey || '' }
                            value={this.state.topic}
                            onChange={(e) => this.onSomethingChange("topic", e)} 
                            validations={[required]}>
                                <option value="0">Chọn chủ đề</option>
                                {this.state.topics &&
                                this.state.topics.map((x) => {
                                    return (
                                        <option value={x.id} key={x.id}>{x.topicName}</option>
                                    )
                                })}
                            </Select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-12">
                            <div>
                                <label className="btn btn-default">
                                    <Input type="file" onChange={this.selectFile}
                                     validations={[required]}
                                     key={this.state.theInputKey || '' }
                                     id="image"
                                    />
                                </label>
                                {this.state.message!== "" && 
                                    <div className="alert alert-light" role="alert">
                                        {this.state.message}
                                    </div>
                                }
                            </div>
                            </div>
                        </div>
                        <div className="form-row mt-3">
                            <div className="col-md-6">
                            <button className="btn btn-primary btn-block" type="submit">
                                <span>Tạo</span>
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

export default CreateActivity;