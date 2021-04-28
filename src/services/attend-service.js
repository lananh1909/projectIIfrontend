import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8081/";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

class AttendService {
    deleteAttend(activityId, volunteerId){
        axios.delete(API_URL + "delete-attend", {
            headers: headers,
            data: {
                activity: activityId,
                volunteer: volunteerId
            }
        })
    }
    getAttends(id){
        return axios.get(API_URL + "get-all-attend/" + id, {headers: headers});
    }
} export default new AttendService();