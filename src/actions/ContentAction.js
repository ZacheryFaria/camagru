import axios from "axios"

const host = "http://" + window.location.hostname + ":5000";

export const upload = (data) => {
    return axios.post(host + "/api/content/upload", data);
};

export const getPost = (id) => {
	return axios.post(host + "/api/content/getpost", {id: id});
};

export const getComments = (id) => {
	return axios.post(host + "/api/content/getcomments", {id: id});
}

export const addComment = (data) => {
	return axios.post(host + "/api/content/addcomment", data);
}

export const getUserPosts = (query) => {
	return axios.post(host + "/api/content/getUserPosts", query);
}

export const getAllPosts = (page) => {
	return axios.post(host + "/api/content/getAllPosts", page);
}

export const getPostOwner = (postId) => {
	return axios.post(host + "/api/content/getPostOwner", postId);
}

export const deletePost = (data) => {
	return axios.post(host + "/api/content/deletePost", data)
}

export const likePost = (data) => {
	return axios.post(host + "/api/content/likePost", data)
}

export const unlikePost = (data) => {
	return axios.post(host + "/api/content/unlikePost", data)
}

export const checkLike = (data) => {
	return axios.post(host + "/api/content/checkLike", data)
}

export const getLikeCount = (data) => {
	return axios.post(host + "/api/content/getLikeCount", data)
}