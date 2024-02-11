import axios from "axios";
let token = localStorage.getItem('jwt');

export default axios.create({
    baseURL: "http://localhost:3001/api/albums",
    method: "DELETE",
    headers: {
        "content-type" : "application/json",
        authorization: `Bearer ${token}`,
    } 
});