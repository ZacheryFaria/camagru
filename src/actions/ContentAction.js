import axios from "axios"

export const upload = (data) => {
    return axios.post("http://localhost:5000/api/content/upload", data);
};

export const getPost = (id) => {
	return axios.post("http://localhost:5000/api/content/getpost", {id: id});
};

export const getComments = (id) => {
	return axios.post("http://localhost:5000/api/content/getcomments", {id: id});
}

export const addComment = (data) => {
	return axios.post("http://localhost:5000/api/content/addcomment", data);
}

export const getUserPosts = (query) => {
	return axios.post("http://localhost:5000/api/content/getUserPosts", query);
}

export const getAllPosts = (page) => {
	return axios.post("http://localhost:5000/api/content/getAllPosts", page);
}