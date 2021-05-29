import axios from 'axios'
import authHeader from './auth-header';
import API from '../Component/API';

const API_URL = API + "api/auth/";
const API_URL1 = API + "user/";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

class AuthService {
    login(username, password){
        return axios.post(API_URL + "signin", {
            username, password
        })
        .then(response => {
            if(response.data.token){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
    }

    logOut(){
        localStorage.removeItem("user");
    }

    register(username, email, password){
        return axios.post(API_URL + "signup", {
            username: username,
            email: email,
            password: password
        });
    }

    registerAdmin(username, email, password, role){
        return axios.post(API_URL + "signup", {
            username: username,
            email: email,
            password: password,
            roleId: role
        });
    }

    getUser(id){
        return axios.get(API_URL1 + "get/" + id, {headers: headers});
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }

    getAllUsers(params){
        return axios.get(API_URL1 + "get-users", {headers: headers, params: params});
    }

    deleteUser(id){
        return axios.delete(API_URL1 + "delete-user", {
            headers: headers,
            data: id
        });
    }

    getStatistic(){
        return axios.get(API_URL + "statistic", {headers: headers});
    }
} export default new AuthService();
