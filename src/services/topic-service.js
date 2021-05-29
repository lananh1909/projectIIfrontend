import axios from 'axios';
import authHeader from './auth-header';
import API from '../Component/API';

const API_URL = API + "topic/";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

class TopicService{
    getTopic(){
        return axios.get(API_URL + "get", {headers: headers});
    }
    createTopic(name){
        return axios.post(API_URL + "create", name, {
            headers: headers
        })
    }

    editTopic(id, name){
        return axios.put(API_URL + "update/" + id, name, {headers: headers});
    }

    deleteTopic(id){
        return axios.delete(API_URL + "delete", {
            headers: headers,
            data: id
        })
    }
} export default new TopicService();