import axios from "axios";

export default function getAddFavorite() {
    console.log("getAddFavorite");
    return axios.create({
        baseURL: "http://localhost:3001/favorites",
        method: "POST",
        headers: {
            "content-type" : "application/json",
        }
    });
}