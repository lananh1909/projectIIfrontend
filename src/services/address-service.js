import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8081/address/";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': authHeader()
}

class AddressService{
    getProvinces(){
        return axios.get(API_URL + "get-all-province", {headers: headers});
    }

    getDistricts(provinceId){
        return axios.post(API_URL + "get-all-district", {provinceId}, {headers: headers})
        .then(
            response => {
                return response.data;
            }
        );
    }

    getCommunes(districtId){
        return axios.post(API_URL + "get-all-commune", {districtId}, {headers: headers})
        .then(
            response => {
                return response.data;
        })
    }
} export default new AddressService();