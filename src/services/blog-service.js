import axios from "axios";
import authHeader from "./auth-header";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

const API_URL = "http://localhost:8081/blog/";


class BlogService{
    addBlog(title, content, files){
        return axios.post(API_URL + "create-blog", 
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
        return axios.get(API_URL + "get-blogs", {headers: headers, params: params});
    }

    deleteBlog(id){
        axios.delete(API_URL + "delete-blog", {
            headers: headers,
            data: id
        });
    }

    getBlogById(id){
        return axios.get(API_URL + "get-blog/" + id, {headers: headers});
    }

    editBlog(id, title, content, files){
        return axios.put(API_URL + "update-blog/" + id, {
            title: title,
            content: content,
            listImage: files
        }, {headers: headers});
    }

} export default new BlogService();