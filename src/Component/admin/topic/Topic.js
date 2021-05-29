import React, { Component } from 'react';

class Topic extends Component {
    constructor(props){
        super(props);
        this.state={
            topic: ""
        }
    }

    componentDidMount() {
        this.setState({
            topic: this.props.topic
        })
    }
    

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{this.state.topic.topicName}</h4>
                    <p className="card-text">Số hoạt động: {this.state.topic.numAct}</p>
                    <p className="card-subtitle small">Tạo bởi: <b>{this.state.topic.createdBy}</b> {new Date(this.state.topic.createdDate).toLocaleDateString("en-GB")}</p>
                    <p className="card-text small font-italic">Sửa đổi lần cuối bởi: <b>{this.state.topic.modifiedBy}</b> {new Date(this.state.topic.modifiedDate).toLocaleDateString("en-GB")}</p>
                    <div className="btn-group btn-block">
                        <button type="button" className="btn btn-danger col-sm-6" onClick={this.props.delete}><i className="far fa-trash-alt mr-1"></i></button>
                        <button type="button" className="btn btn-warning col-sm-6" onClick={this.props.edit}><i className="fas fa-pencil-alt mr-1"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Topic;