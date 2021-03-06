import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UploadFilesService from '../../../services/files-service';
import TextArea from "react-validation/build/textarea"
import filesService from '../../../services/files-service';
import blogService from '../../../services/blog-service';
import API from '../../API';

const API_URL = API + "file/";

const required = value => {
    if(!value || value === "0"){
        return (
            <div className="alert alert-danger" role = "alert">
                This field is required!
            </div>
        )
    }
}


const divStyle = {
    position: 'relative',
    overflow: 'auto',
    display: 'inline-block'
}

const closeStyle = {
    position: 'absolute',
    zIndex: '2',
    top: '0px',
    left: '16px',
    cursor: 'pointer'
}

class EditBlog extends Component {
        constructor(props){
        super(props);
        this.onReset = this.onReset.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.upload = this.upload.bind(this);
        this.state = {
            title: "",
            content: "",            
            selectedFiles: undefined,
            progressInfos: [],
            progress: 0,
            message: [], 
            image: [],
            theInputKey: "",
            listId: [],
            blog: ""
        }
    }

    componentDidMount() {
        blogService.getBlogById(this.props.match.params.id)
        .then(
            response => {
                this.setState({
                    blog: response.data,
                    title: response.data.title,
                    content: response.data.content,
                    listId: response.data.images
                })
            }
        )        
    }
    
    selectFile = (event) => {
        this.setState({
            selectedFiles: event.target.files
        })
    }
    
    upload(idx, file){
        let _progressInfos = [...this.state.progressInfos];

        UploadFilesService.uploadProgress(file, (event) => {
            _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
            this.setState({
                progressInfos: _progressInfos
            })
        })
        .then(
            response => {
                if(response.data === "File too large!"){
                    _progressInfos[idx].percentage = 0;
                    this.setState((prev) => {
                        let nextMessage = [...prev.message, "File too large: " + file.name];
                        return {
                            progressInfos: _progressInfos,
                            message: nextMessage,
                            image: [...this.state.image, null]
                        };
                    });
                } else {
                    this.setState((prev) => {
                        let nextMessage = [...prev.message, "Uploaded the file successfully: " + file.name];
                        return {
                            message: nextMessage,
                            image: [...this.state.image, response.data]
                        }
                    })
                }
            },
            error => {
                _progressInfos[idx].percentage = 0;
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Could not upload the file: " + file.name];
                    return {
                        progressInfos: _progressInfos,
                        message: nextMessage,
                        image: [...this.state.image, null]
                    };
                });
            }
        ).catch((ex) => {
            _progressInfos[idx].percentage = 0;
            this.setState((prev) => {
                let nextMessage = [...prev.message, "Could not upload the file: " + file.name];
                return {
                    progressInfos: _progressInfos,
                    message: nextMessage,
                    image: [...this.state.image, null]
                };
            });
        });
    }
    
    uploadFiles(e) {
        e.preventDefault();
        const selectedFiles = this.state.selectedFiles;

        let _progressInfos = [...this.state.progressInfos];
        let n = _progressInfos.length;

        for (let i = 0; i < selectedFiles.length; i++) {
            _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
        }

        this.setState(
            {
                progressInfos: _progressInfos,
                message: [],
            },
            () => {
                for (let i = 0; i < selectedFiles.length; i++) {
                    this.upload(i + n, selectedFiles[i]);
                }
            }
        );
        this.setState({
            selectedFiles: undefined
        })
    }

    onSomethingChange = (name, event) => {
        this.setState({[name]: event.target.value});
    }

    onReset = (e) => {
        let randomString = Math.random().toString(36);
        if(this.state.image){
            this.state.image.map((img, index) => {
                filesService.delete(img.id);
                return true;
            })
        }
        this.setState({
            theInputKey: randomString,
            title: this.state.blog.title,
            content: this.state.blog.content,  
            selectedFiles: undefined,
            progressInfos: [],
            image: [],
            message: "",
            listId: this.state.blog.images
        })
    }
    
    handleAdd(e){
        e.preventDefault();
        this.form.validateAll();
        if(this.checkBtn.context._errors.length === 0){
            let idList = [...this.state.listId];
            this.state.image.forEach(element => {
                if(element){
                    idList.push(element.id);
                }
            });
            blogService.editBlog(this.state.blog.id, this.state.title, this.state.content, idList)
            .then(
                response => {
                    window.alert("???? s???a b??i vi???t th??nh c??ng!");
                    window.location.replace("/listBlog");
                },
                error => {
                    console.log(error.toString());
                }
            )               
            
        }  
        
    }

    deleteImage = (event, index) => {
        event.preventDefault();
        const p = [...this.state.progressInfos];
        const i = [...this.state.image];
        if(i[index] !== null){
            filesService.delete(i[index].id);
        }
        p.splice(index, 1);
        i.splice(index, 1);
        this.setState({
            progressInfos: p,
            image: i
        })
    }

    delete(e, index){
        e.preventDefault();
        const newList = [...this.state.listId];
        newList.splice(index, 1);
        this.setState({
            listId: newList
        })
    }

    render() {
        const { selectedFiles, progressInfos, message, image} = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header"><h3 className="text-center font-weight-light my-4">S???a b??i vi???t</h3></div>
                    <div className="card-body">
                        <Form onSubmit={this.handleAdd}
                        ref={c => {
                            this.form = c;
                        }}>
                        <div className="form-row">
                            <div className="col-md-12">
                            <div className="form-group">
                                <label className="small mb-1" htmlFor="title">Ti??u ?????</label>
                                <Input className="form-control py-4" 
                                id="title" 
                                key={this.state.theInputKey || '' }
                                type="text" 
                                placeholder="Nh???p ti??u ?????" 
                                value= {this.state.title}
                                onChange={(e) => this.onSomethingChange("title", e)} 
                                validations = {[required]}/>
                            </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small mb-1" htmlFor="content">N???i dung</label>
                            <TextArea className="form-control py-4" rows="3"
                            id="content" type="text" 
                            placeholder="Nh???p n???i dung" 
                            key={this.state.theInputKey || '' }
                            value = {this.state.content}
                            onChange={(e) => this.onSomethingChange("content", e)} 
                            validations = {[required]}></TextArea>
                        </div>  
                        <div className="form-row">
                            <div className="col-md-12">
                            <div className="row">
                                {this.state.listId && this.state.listId.map((id, idx) => (
                                    <div style={divStyle} className="col-sm-4 mt-2">
                                        <img src={API_URL + id} alt={this.state.blog.title} className="img-fluid"/>
                                        <div onClick={(e, index) => this.delete(e, idx)} style={closeStyle}><i className="fas fa-times text-light"></i></div>
                                    </div>
                                ))}
                            </div>
                            </div>
                        </div>     
                        <div className="form-row">
                            <div className="col-md-12">
                            <div>
                                {progressInfos && progressInfos.map((progressInfo, index) => (
                                    <div className="mb-2" key={index}>
                                        {image[index] && 
                                        <img src={API_URL + "/files/" + image[index].id} alt={progressInfo.fileName} height="80px" className="mr20" />}                                                                                
                                        <span>{progressInfo.fileName}</span>
                                        <span style={{float:"right"}} onClick={(e, idx) => this.deleteImage(e, index)}><i className="fas fa-window-close"></i></span>
                                        <div className="progress">
                                            <div
                                                className="progress-bar progress-bar-info progress-bar-striped"
                                                role="progressbar"
                                                aria-valuenow={progressInfo.percentage}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{ width: progressInfo.percentage + "%" }}
                                                >
                                                {progressInfo.percentage}%
                                            </div>
                                        </div> 
                                    </div>
                                ))}                         
                                
                                <label className="btn btn-default">
                                    <Input type="file" onChange={this.selectFile}
                                     multiple
                                     key={this.state.theInputKey || '' }
                                     id="image"
                                    />
                                </label>
                                <button className="btn btn-success"
                                    disabled={!selectedFiles}
                                    onClick={this.uploadFiles}
                                    >
                                    Upload
                                </button>
                                {message.length > 0 && (
                                <div className="alert alert-secondary" role="alert">
                                    <ul>
                                    {message.map((item, i) => {
                                        return <li key={i}>{item}</li>;
                                    })}
                                    </ul>
                                </div>
                                )}
                            </div>
                            </div>
                        </div>
                        <div className="form-row mt-3">
                            <div className="col-md-6">
                            <button className="btn btn-primary btn-block" type="submit">
                                <span>C???p nh???p</span>
                            </button>
                            </div>
                            <div className="col-md-6">
                            <button className="btn btn-danger btn-block" type="reset" onClick={this.onReset}>L??m m???i</button>
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

export default EditBlog;