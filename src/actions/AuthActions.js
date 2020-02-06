import axios from "axios"

const host = "http://" + window.location.hostname + ":5000";

export const login = (state) => {
	return axios.post(host + "/api/auth/login", state);
};

export const register = (state) => {
	return axios.post(host + "/api/auth/register", state);
};

export const ping = (token) => {
	return axios.post(host + "/api/auth/ping", token);
};

export const logout = (token) => {
	return axios.post(host + "/api/auth/logout", token);
};

export const getUserDetails = (token) => {
	return axios.post(host + "/api/auth/getUserDetails", token);
};

export const validateEmail = (token) => {
	return axios.post(host + "/api/auth/validateEmail", token);
}

export const resendEmail = (email) => {
	return axios.post(host + "/api/auth/resendvalidationemail", email);
}

export const sendPasswordLink = (email) => {
	return axios.post(host + "/api/auth/sendPasswordLink", email);
}

export const resetPasswordLink = (token) => {
	return axios.post(host + "/api/auth/resetPasswordLink", token);
}

export const changePassword = (data) => {
	return axios.post(host + "/api/auth/changePassword", data);
}

export const updateUserDetails = (data) => {
	return axios.post(host + "/api/auth/updateUserDetails", data);
}