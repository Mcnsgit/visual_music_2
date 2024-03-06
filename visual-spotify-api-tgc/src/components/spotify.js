import axios from "axios";
import React, { useEffect, useHistory } from 'react';



const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "1f42356ed83f46cc9ffd35c525fc8541";
const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};



function AuthCallback() {
    const history = useHistory();

    useEffect(() => {
        const hash = window.location.hash;
        let token = null;

        if (hash) {
            const params = new URLSearchParams(hash.substring(1)); // Remove the '#' character
            token = params.get('access_token');
        }

        if (token) {
            // Optionally store the token for future API requests
            sessionStorage.setItem('spotify_access_token', token);

            // Redirect to the home page
            history.push('/home');
        } else {
            // Handle error or redirect to login page
            history.push('/login');
        }
    }, [history]);

    return <div>Redirecting...</div>;
}

export default apiClient;