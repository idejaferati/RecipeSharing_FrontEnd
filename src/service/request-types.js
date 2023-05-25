import axios from "axios";
import { API_PATH } from "../constants.ts";

export const postRequest = async (path, data, additionalData) => {
    const response = await axios.post(API_PATH + path, data, additionalData);
    return response;
}

export const putRequest = async (path, id, data, additionalData) => {
    const response = await axios.post(API_PATH + path + '/' + id, data, additionalData);
    return response;
}

export const getRequest = async (path) => {
    const response = await axios.get(API_PATH + path);
    return response;
}

export const deleteRequest = async (path, id, data, additionalData) => {
    const response = await axios.delete(API_PATH + path + '/' + id, data, additionalData);
    return response;
}
