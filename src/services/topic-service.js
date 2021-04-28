import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8081/";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

class TopicService{
    getTopic(){
        return axios.get(API_URL + "get-all-topic", {headers: headers});
    }
} export default new TopicService();