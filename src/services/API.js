import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACK_END_URL;

function CreateAccount(body) {
    return axios.post(`${BASE_URL}/users`, body);
}
function CreateSession(body) {
    return axios.post(`${BASE_URL}/login`, body);
}
function CreateContact({body, token}) {
    return axios.post(`${BASE_URL}/contacts`, body, {headers: { Authorization: `Bearer ${token}`}})
}
function UpdateContact({body, token, contactId}) {
    return axios.patch(`${BASE_URL}/contacts/${contactId}`, body, {headers: { Authorization: `Bearer ${token}`}})
}
function UpdateUser({body, userId}) {
    return axios.patch(`${BASE_URL}/users/${userId}`, body)
}
function DeleteContact({token, contactId}) {
    return axios.delete(`${BASE_URL}/contacts/${contactId}`, {headers: { Authorization: `Bearer ${token}`}})
}
function DeleteUser(userId) {
    return axios.delete(`${BASE_URL}/users/${userId}`)
}
function GetUserData(token) {
    return axios.get(`${BASE_URL}/contacts/retrieve`, {headers: { Authorization: `Bearer ${token}`}});
}

const api = {
    CreateAccount,
    CreateSession,
    GetUserData,
    CreateContact,
    UpdateContact,
    DeleteContact,
    UpdateUser,
    DeleteUser
};

export default api;
