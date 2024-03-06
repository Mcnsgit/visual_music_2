import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useState, useEffect } from "react";
import { setClientToken } from "./api/spotify";
import Home from "./screens/home.js";

import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';


export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}
