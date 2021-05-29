import axios from 'axios';
import AuthService from "./auth-service";
import authHeader from './auth-header';
import API from '../Component/API';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

const API_URL = API + "activity/";

const currentUser = AuthService.getCurrentUser()

class ActivityService{
    addActivity(title, content, location, communeId, topicId, fileId, fromDate, toDate){
        return axios.post(API_URL + "create",
        {
            title: title,
            content: content,
            location: location,
            communeId: communeId,
            topicId: topicId,
            userId: currentUser.id,
            fileId: fileId,
            fromDate: fromDate,
            toDate: toDate
        }, {headers: headers})
        .then(
            response => {
                return response.data;
            }
        )
    }

    getActivityById(id){
        return axios.get(API_URL + "get/" + id, {headers: headers});
    }

    deleteActivity(id){
        axios.delete(API_URL + "delete", {
            headers: headers,
            data: id
        });
    }

    editActivity(id, title, content, location, communeId, topicId, fileId, fromDate, toDate){
        return axios.put(API_URL + "update/" + id, {
            title: title,
            content: content,
            location: location,
            communeId: communeId,
            topicId: topicId,
            userId: currentUser.id,
            fileId: fileId,
            fromDate: fromDate,
            toDate: toDate
        }, {headers: headers});
    }

    getByPage(params){
        return axios.get(API_URL + "get",{headers: headers, params: params});
    }

    getFollowing(){
        return axios.get(API_URL + "following", {headers: headers});
    }
} export default new ActivityService();