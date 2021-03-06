import axios from "axios";
import authHeader from "./auth-header";
import API from "../Component/API"

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

const API_URL = API + "blog/";


class BlogService{
    addBlog(title, content, files){
        return axios.post(API_URL + "create", 
        {
            title: title,
            content: content,
            listImage: files
        }, {headers: headers})
        .then(
            response => {
                return response.data;
            }
        )
    }

    getBlog(params){
        return axios.get(API_URL + "get", {headers: headers, params: params});
    }

    deleteBlog(id){
        axios.delete(API_URL + "delete", {
            headers: headers,
            data: id
        });
    }

    getBlogById(id){
        return axios.get(API_URL + "get/" + id, {headers: headers});
    }

    editBlog(id, title, content, files){
        return axios.put(API_URL + "update/" + id, {
            title: title,
            content: content,
            listImage: files
        }, {headers: headers});
    }

} export default new BlogService();