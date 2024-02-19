import axios from "axios";

export default function setUpdateUser() {
    let jwtCookie = document.cookie.split(";").find(row => row.startsWith('jwt='));
    let token = jwtCookie ? jwtCookie.split('=')[1] : undefined;

    return axios.create({
        baseURL: "http://localhost:3001/update",
        method: "PUT",
        headers: {
            "content-type" : "application/json",
            authorization: `Bearer ${token}`,
        } 
    });
}