import axios from "axios";

export default function getFetchFavorites() {
    return axios.create({
        baseURL: "http://localhost:3001/favorites",
        method: "GET",
        headers: {
            "content-type" : "application/json",
        } 
    });
}