import axios from "axios";
// let token = localStorage.getItem('jwt');
let jwtCookie = document.cookie.split(";").find(row => row.startsWith('jwt='));
let token = jwtCookie ? jwtCookie.split('=')[1] : undefined;

console.log("token", token)

export default axios.create({
    baseURL: 'http://localhost:3001', 
    method: "GET",
    headers: {
        "content-type" : "application/json",
        authorization: `Bearer ${token}`,
    } 
})