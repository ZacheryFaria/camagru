import axios from "axios"

export const login = (state) => {
	return axios.post("http://localhost:5000/api/auth/login", state);
}

export const ping = (token) => {
	return axios.post("http://localhost:5000/api/auth/ping", token);
}

export const logout = (token) => {
	return axios.post("http://localhost:5000/api/auth/logout", token);
}

export const getUserDetails = (token) => {
	return axios.post("http://localhost:5000/api/auth/getUserDetails", token);
}