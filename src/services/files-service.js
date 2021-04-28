import axios from "axios"
import authHeader from "./auth-header"

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

const API_URL = "http://localhost:8081/";

class UploadFilesService {
    upload(file){
        let formData = new FormData();
        formData.append("file", file);
        return axios.post(API_URL + "upload", formData, {headers: headers});
    }

    getFiles(){
        return axios.get(API_URL + "files", {headers: headers});
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
        axios.delete(API_URL + "delete-files/" + id, {
            headers: headers
        })
    }
} export default new UploadFilesService();