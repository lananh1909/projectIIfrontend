import React, { Component } from 'react';
import topicService from '../../../services/topic-service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Topic from './Topic';

class CreateTopic extends Component {
    constructor(props){
        super(props);
        this.state = {
            topic: "",
            topics: [],
            id: "",
            name: ""
        }
    }

    componentDidMount() {
        topicService.getTopic().then(
            response => {
                this.setState({
                    topics: response.data
                });
            }, 
            error => {
                console.log(error.toString());
            }
        )
    }
    
    showCreateTopic = () => {
        var add = document.querySelector("#add");
        var edit = document.querySelector("#edit");
        if(edit && !edit.classList.contains("d-none")){
            edit.classList.add("d-none");
        }
        if(add){
            add.classList.toggle("d-none");
        }
    }

    handleAdd= (e) => {
        e.preventDefault();
        topicService.createTopic(this.state.topic)
        .then(
            (respone) => {
                window.alert("Đã lưu!")
                this.setState({
                    topic: "",
                    topics: [...this.state.topics, respone.data]
                })
                this.showCreateTopic();
            },
            (error) => {
                const resMessage = (error.response && error.response.data) ||
                    error.message || error.toString();
                window.alert(resMessage);
            }
        )
    }

    handleEdit = (e) => {
        e.preventDefault();
        topicService.editTopic(this.state.id, this.state.name)
        .then(
            (respone) => {
                window.alert("Đã lưu!")
                window.location.reload();
            },
            (error) => {
                const resMessage = (error.response && error.response.data) ||
                    error.message || error.toString();
                window.alert(resMessage);
            }
        )
    }

    onChangeTopic = (e) => {
        this.setState({
            topic: e.target.value
        })
    }

    onChangeEdit = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    showEditTopic = (topic) => {
        window.scrollTo(0, 0);
        var edit = document.querySelector("#edit");
        if(edit && edit.classList.contains("d-none")){
            edit.classList.remove("d-none");
        }
        var add = document.querySelector("#add");
        if(add && !add.classList.contains("d-none")){
            add.classList.add("d-none");
        }
        this.setState({
            id: topic.id,
            name: topic.topicName
        })
    }

    cancelEdit = (e) => {
        e.preventDefault();
        var edit = document.querySelector("#edit");
        if(edit && !edit.classList.contains("d-none")){
            edit.classList.add("d-none");
        }
    }

    delete(id) {
        var r = window.confirm("Bạn có chắc muốn xóa chủ đề này không?");
        if (r === true) {
            topicService.deleteTopic(id)
            .then(
                (respone) => {
                    window.alert("Đã xóa!")
                    var t = [...this.state.topics];
                    t = t.filter((item) => item.id !== id);
                    this.setState({
                        topics: t
                    })
                },
                (error) => {
                    const resMessage = (error.response && error.response.data) ||
                        error.message || error.toString();
                    window.alert(resMessage);
                }
            )
            
        } else {
        }           
    }

    render() {
        return (
            <div>
                <div className="container">
                    <button className="btn btn-primary mt-5" onClick={this.showCreateTopic}><i className="far fa-calendar-plus mr-1"></i> Thêm</button>
                    <div id="add" className="row justify-content-left d-none">
                        <div className="col-lg-7">
                            <div className="card shadow-md border-0 rounded-lg" >
                                <Form onSubmit={this.handleAdd}>
                                    <div className="form-group">                                        
                                        <label htmlFor="topicName">Topic name</label>
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <Input type="text" className="form-control" name="topicName" value={this.state.topic} onChange={this.onChangeTopic}/>
                                            </div>
                                            <div className="col">
                                                <Input type="submit" className="btn btn-success" value="Lưu lại"/>
                                            </div>   
                                        </div>
                                        
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>

                    <div id="edit" className="row justify-content-left d-none">
                        <div className="col-lg-7">
                            <div className="card shadow-md border-0 rounded-lg" >
                                <Form onSubmit={this.handleEdit}>
                                    <h2>Chỉnh sửa</h2>
                                    <div className="form-group">                                        
                                        <label htmlFor="topicName">Topic ID</label>
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <Input type="text" className="form-control" name="topicName" value={this.state.id} readOnly/>
                                            </div> 
                                        </div>
                                        
                                    </div>
                                    <div className="form-group">                                        
                                        <label htmlFor="topicName">Topic name</label>
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <Input type="text" className="form-control" name="topicName" value={this.state.name} onChange={this.onChangeEdit}/>
                                            </div>
                                            <div className="col btn-group">
                                                <Input type="submit" className="btn btn-success" value="Lưu lại"/>
                                                <button className="btn btn-danger" onClick={this.cancelEdit}>Cancel</button>
                                            </div>   
                                        </div>
                                        
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.topics && this.state.topics.map((item, index) => (
                            <div className="col-sm-4" key={item.id}>
                                <Topic topic={item} delete={(id) => this.delete(item.id)} edit={(topic) => this.showEditTopic(item)}/>
                            </div>                            
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTopic;