import axios from 'axios';
import authHeader from './auth-header';
import API from '../Component/API';

const API_URL = API + "attend/";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

class AttendService {
    deleteAttend(activityId, volunteerId){
        axios.delete(API_URL + "delete", {
            headers: headers,
            data: {
                activity: activityId,
                volunteer: volunteerId
            }
        })
    }
    getAttends(id){
        return axios.get(API_URL + "get/" + id, {headers: headers});
    }

    createAttend(id, skill){
        return axios.post(API_URL + "insert", {
            activityId: id,
            skill: skill
        }, {headers: headers}).then(
            response => {
                return response.data
            }
        )
    }

    getByVolunteer(){
        return axios.get(API_URL + "activities" , {headers: headers});
    }

    getStatistic(){
        return axios.get(API_URL + "statistic", {headers:headers});
    }
} export default new AttendService();