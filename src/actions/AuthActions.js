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