import axios from "axios";

// URL dari API backend, didapatkan dari environment variable
const API_URL = process.env.REACT_APP_API_URL;

export const requestGetApi = async (endPoint, reqparams) => {
    try {
        const response = await axios.get(`${API_URL}/` + endPoint, {params : reqparams});
        // console.log(response, 'cek respon api helper');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const requestPostApi = async (endPoint, reqparams) => {
    try {
        const response = await axios.post(`${API_URL}/` + endPoint, reqparams);
        // console.log(response, 'cek respon api helper');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}