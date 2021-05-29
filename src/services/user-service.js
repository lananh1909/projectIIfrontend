import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8081/api/test/";
const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

class UserService {
    getPublicContent(){
        return axios.get(API_URL + 'all');
    }

    getUserBoard(){
        return axios.get(API_URL + "user", {headers: headers});
    }

    getAdminBoard(){
        return axios.get(API_URL + "admin", {headers: headers});
    }

    
} export default new UserService();