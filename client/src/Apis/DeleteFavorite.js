import axios from "axios";

export default function setDeleteFavorite() {
    console.log("setDeleteFavorite");
    return axios.create({
        baseURL: "http://localhost:3001/favorites",
        method: "DELETE",
        headers: {
            "content-type" : "application/json",
        }
    });
}