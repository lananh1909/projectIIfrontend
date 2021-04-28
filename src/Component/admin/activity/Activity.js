import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const API_URL = "http://localhost:8081/files/";

const style = {
    overflow: 'hidden',
    textOverflow: 'ellipsis', 
    display: '-webkit-box', 
    WebkitLineClamp: 2, /* number of lines to show */
    WebkitBoxOrient: 'vertical'
}

class Activity extends Component {
    constructor(props){
        super(props);
        this.state = {
            activity: ""
        }
    }
    componentDidMount() {
        this.setState({
            activity: this.props.activity
        })
    }

    toStringCommune(commune){
        if(commune){
            var district = commune.district;
            var province = district.province;
            return commune.communeName + ", " + district.districtName + ", " + province.provinceName;   
        }            
    }
    
    render() {
        return (
            <div className="card">
                {this.state.activity.image?(
                    <img src={API_URL + this.state.activity.image.id} alt={this.state.activity.image.name} className="card-img-top" />
                ):<img src="/" alt="Không thể load ảnh" className="card-img-top"/>}
                
                <div className="card-body">
                    <h4 className="card-title">{this.state.activity.title}</h4>
                    <p className="card-text" style={style}>{this.state.activity.content}</p>
                    <p className="card-subtitle"><b>Địa điểm: </b>{this.toStringCommune(this.state.activity.commune)}</p>
                    <p className="card-text small font-italic">Số người đăng ký: {this.state.activity.numVolunteer}</p>
                </div>
                <div className="btn-group btn-block" style={{float:"right"}}>
                    <button type="button" className="btn btn-danger col-sm-4" onClick={this.props.delete}><i className="far fa-trash-alt mr-1"></i>Xóa</button>
                    <Link to={"/activity/edit/" + this.state.activity.id} className="btn btn-warning col-sm-4"><i className="fas fa-pencil-alt mr-1"></i>Sửa</Link>
                    <Link to={"/activity/" + this.state.activity.id} className="btn btn-success col-sm-4"><i className="fas fa-info-circle mr-1"></i>Chi tiết</Link>
                </div>
            </div>
        );
    }
}

export default Activity;