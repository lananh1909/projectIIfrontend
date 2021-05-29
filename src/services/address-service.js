import axios from 'axios';
import authHeader from './auth-header';
import API from '../Component/API';

const API_URL = API + "address/";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

class AddressService{
    getProvinces(){
        return axios.get(API_URL + "provinces", {headers: headers});
    }

    getDistricts(provinceId){
        return axios.post(API_URL + "districts", {provinceId}, {headers: headers})
        .then(
            response => {
                return response.data;
            }
        );
    }

    getCommunes(districtId){
        return axios.post(API_URL + "communes", {districtId}, {headers: headers})
        .then(
            response => {
                return response.data;
        })
    }
} export default new AddressService();