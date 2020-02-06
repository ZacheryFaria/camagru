import axios from "axios"

export const login = (state) => {
	return axios.post("http://localhost:5000/api/auth/login", state);
};

export const register = (state) => {
	return axios.post("http://localhost:5000/api/auth/register", state);
};

export const ping = (token) => {
	return axios.post("http://localhost:5000/api/auth/ping", token);
};

export const logout = (token) => {
	return axios.post("http://localhost:5000/api/auth/logout", token);
};

export const getUserDetails = (token) => {
	return axios.post("http://localhost:5000/api/auth/getUserDetails", token);
};

export const validateEmail = (token) => {
	return axios.post("http://localhost:5000/api/auth/validateEmail", token);
}

export const resendEmail = (email) => {
	return axios.post("http://localhost:5000/api/auth/resendvalidationemail", email);
}

export const sendPasswordLink = (email) => {
	return axios.post("http://localhost:5000/api/auth/sendPasswordLink", email);
}

export const resetPasswordLink = (token) => {
	return axios.post("http://localhost:5000/api/auth/resetPasswordLink", token);
}

export const changePassword = (data) => {
	return axios.post("http://localhost:5000/api/auth/changePassword", data);
}

export const updateUserDetails = (data) => {
	return axios.post("http://localhost:5000/api/auth/updateUserDetails", data);
}