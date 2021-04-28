import React, { Component } from 'react';
import UploadFilesService from "../services/files-service"

class ListImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: undefined
        }
    }
    componentDidMount() {
        UploadFilesService.getFiles().then(
            response => {
                this.setState({
                    data: response.data
                });
            }
        )
    }
    

    render() {
        return (
            <div>
                <div className="card">
                    <ul className="list-group list-group-flush">
                        {this.state.data && this.state.data.map((image, index) => (
                            <li className="list-group-item" key={index}>
                                <img src={image.url} alt={image.name} height="80px" className="mr20" />
                                <a href={image.url}>{image.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ListImage;