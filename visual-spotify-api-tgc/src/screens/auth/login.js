import React from 'react';
import axios from 'axios';

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = "Bearer " + token;
        return config;
    });
};

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "1f42356ed83f46cc9ffd35c525fc8541";
const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private"];
export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;

export const login = () => {
    window.open(loginEndpoint, "_blank");
};

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=1f42356ed83f46cc9ffd35c525fc8541&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function Login() {
    return (
        <div className="login">
            <a href={AUTH_URL} target="_self">Login With Spotify</a>
        </div>
    );
}
