import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import { isEmail } from "validator";
import authService from '../../../services/auth-service';
import { Link } from 'react-router-dom';

const required = value => {
    if(!value || value === "0"){
        return (
            <div className="alert alert-danger" role = "alert">
                This field is required!
            </div>
        )
    }
}
const email = value => {
    if(!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                This is not a valid email!
            </div>
        );
    }
};

const vusername = value => {
    if(value.length < 3 || value.length > 20){
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

class EditUser extends Component {
    constructor(props){
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onReset = this.onReset.bind(this);
        this.state = {
            user: "",
            theInputKey: "",
            username: "",
            password: "",
            email: "",
            role: "0",
            successful: false,
            message: ""
        }
    }

    componentDidMount() {
        authService.getUser(this.props.match.params.id)
        .then(
            (response) => {
                this.setState({
                    user: response.data
                }, () => this.genState())
            },
            (error) => {
                console.log(error.toString());
            }
        )
    }

    genState(){
        this.setState({
            username: this.state.user.username,
            email: this.state.user.email,
            role: this.state.user.role.id
        })
    }
    

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeRole(e){
        this.setState({
            role: e.target.value
        });
    }

    handleRegister(e){
        e.preventDefault();
        this.setState({
            message: "",
            successful: false
        });
        this.form.validateAll();
        if(this.checkBtn.context._errors.length === 0){
            authService.registerAdmin(this.state.username, this.state.email, this.state.password, this.state.role)
            .then(
                response => {
                    window.alert("Đã tạo người dùng thành công!");
                    this.props.history.replace("/listUser");
                },
                error => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) ||
                    error.message || error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    onReset(e){
        e.preventDefault();
        let randomString = Math.random().toString(36);
        this.setState({
            theInputKey: randomString,
            username: this.state.user.username,
            email: this.state.user.email,
            role: this.state.user.role.id,
            successful: false,
            message: ""
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                    <Link to="/listActivity" className="btn btn-success mt-2 mb-2"><i className="fas fa-arrow-circle-left"></i> Back</Link>
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Tạo mới user</h3></div>
                            <Form
                                onSubmit={this.handleRegister}
                                ref={c => {
                                this.form = c;
                                }}
                            >
                                {!this.state.successful && (
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <Input
                                                key={this.state.theInputKey || '' }
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.onChangeUsername}
                                                validations={[required, vusername]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Input
                                                type="text"
                                                key={this.state.theInputKey || '' }
                                                className="form-control"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onChangeEmail}
                                                validations={[required, email]}
                                            />
                                        </div>                                    

                                        <div className="form-row">
                                            <div className="col-md-12">
                                            <label htmlFor="role" className="small mb-1">Chọn phân quyền</label>
                                            <Select name="role" className="custom-select" 
                                            key={this.state.theInputKey || '' }
                                            value={this.state.role}
                                            onChange={this.onChangeRole} 
                                            validations={[required]}>
                                                <option value="0" key="0">Chọn phân quyền</option>
                                                <option value="1" key="1">ROLE_ADMIN</option>
                                                <option value="2" key="2">ROLE_USER</option>
                                            </Select>
                                            </div>
                                        </div>

                                        <div className="form-row mt-4">
                                            <div className="col-md-6">
                                            <button className="btn btn-primary btn-block" type="submit">
                                                <span>Tạo</span>
                                            </button>
                                            </div>
                                            <div className="col-md-6">
                                            <button className="btn btn-danger btn-block" type="reset" onClick={this.onReset}>Làm mới</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {this.state.message && (
                                    <div className="form-group">
                                        <div
                                            className={
                                                this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                            }
                                            role="alert"
                                        >
                                        {this.state.message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUser;