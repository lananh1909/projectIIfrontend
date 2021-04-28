import axios from 'axios';
import AuthService from "./auth-service";
import authHeader from './auth-header';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

const API_URL = "http://localhost:8081/activity/";

const currentUser = AuthService.getCurrentUser()

class ActivityService{
    addActivity(title, content, location, communeId, topicId, fileId, fromDate, toDate){
        return axios.post(API_URL + "create-activity",
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

    getActivity(){
        return axios.get(API_URL + "get-all-activity", {headers: headers});
    }

    getActivityById(id){
        return axios.get(API_URL + "get-activity/" + id, {headers: headers});
    }

    deleteActivity(id){
        axios.delete(API_URL + "delete-activity", {
            headers: headers,
            data: id
        });
    }

    editActivity(id, title, content, location, communeId, topicId, fileId, fromDate, toDate){
        return axios.put(API_URL + "update-activity/" + id, {
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

    getVolunteers(id){
        return axios.post(API_URL + "get-volunteers", id, {headers: headers});
    }

    getByPage(params){
        return axios.get(API_URL + "activities",{headers: headers, params: params});
    }
} export default new ActivityService();