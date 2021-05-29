import axios from "axios";
import authHeader from "./auth-header";
import API from '../Component/API';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

const API_URL = API + "file/";

class UploadFilesService {
    upload(file){
        let formData = new FormData();
        formData.append("file", file);
        return axios.post(API_URL + "upload", formData, {headers: headers});
    }

    getFiles(){
        return axios.get(API_URL, {headers: headers});
    }

    uploadProgress(file, onUploadProgress) {
        let formData = new FormData();
    
        formData.append("file", file);
    
        return axios.post(API_URL + "upload", formData, {
          headers:headers,
          onUploadProgress,
        });
    }
    delete(id){
        axios.delete(API_URL + "delete/" + id, {
            headers: headers
        })
    }
} export default new UploadFilesService();