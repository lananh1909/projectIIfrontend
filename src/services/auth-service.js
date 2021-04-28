import axios from 'axios'

const API_URL = "http://localhost:8081/api/auth/"

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

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
} export default new AuthService();
