import { postRequest } from "./request-types.js";

export const registerUser = async (data) => {
    const header = { headers: {
        'Content-Type': 'application/json'
    }};
    const response = await postRequest('Users/Register', JSON.stringify(data), header);
    return response;
}

export const loginUser = async (data) => {
    const header = { headers: {
        'Content-Type': 'application/json'
    }};
    const response = await postRequest('Users/Login', JSON.stringify(data), header);
    return response;
}

export const changePassword = async (data) => {
    const header = { headers: {
        'Content-Type': 'application/json'
    }};
    const response = await postRequest('Users/change-password', JSON.stringify(data), header);
    return response;
}

