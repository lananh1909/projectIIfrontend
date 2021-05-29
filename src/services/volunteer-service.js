import axios from 'axios';
import authHeader from './auth-header';
import API from '../Component/API';

const API_URL = API + "volunteer/";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

class VolunteerService{
    createVolunteer(fullname, phoneNum, birthDate, gender, commune){
        return axios.post(API_URL + "create", {
            fullName: fullname,
            phoneNum: phoneNum,
            birthDate: birthDate,
            gender: gender,
            communeId: commune
        }, {headers: headers}).then(
            response => {
                return response.data;
            }
        )
    }

    getVolunteer(){
        return axios.get(API + "volunteer", {headers: headers});
    }
} export default new VolunteerService();