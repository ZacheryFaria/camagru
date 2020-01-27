import axios from "axios"

export const upload = (data) => {
    return axios.post("http://localhost:5000/api/content/upload", data);
};