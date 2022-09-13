import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home"
import axios from 'axios';

export default function App() {

  const host = "http://127.0.0.1:8000";
  const endpoints = {
    getLoginURL: "/tesla-url/",
    registerUser: "/token-from-callback",
    vehicles: "/vehicles/",
    honk: "/vehicle/honk/",
    lights: "/vehicle/lights/",
    trunk: "/vehicle/trunk/",
    data: "/vehicle/data/",
  }

  const getLogin = (username) => {
    const url = host + endpoints.getLoginURL;
    return getRequest(url, username)
  }

  const submitURL = async (username, cbURL) => {
    const url = host + endpoints.registerUser;
    const body = { username: username, url: cbURL};
    return postRequest(url, body);
  }

  const getVehicles = async (username) => {
    const url = host + endpoints.vehicles;
    return getRequest(url, username);
  };

  const honkHorn = async (username) => {
    const url = host + endpoints.honk;
    const body = { username };
    return postRequest(url, body);
  };

  const flashLights = async (username) => {
    const url = host + endpoints.lights;
    const body = { username };
    return postRequest(url, body);
  };

  const openTrunk = async (username, whichTrunk) => {
    const url = host + endpoints.trunk;
    const body = { username, location: whichTrunk };
    return postRequest(url, body);
  };

  const getData = async (username) => {
    const url = host + endpoints.data;
    return getRequest(url, username);
  };

  const getRequest = async (url, body) => {
    const safeURL = encodeURI(body)
    return fetch(`${url}${safeURL}`)
  }

  const postRequest = async (url, body) => {
    return axios.post(url, null, { params: {
      ...body
    }})
  }

  const appState = {
    getLogin,
    submitURL,
    getVehicles,
    honkHorn,
    flashLights,
    openTrunk,
    getData,
  }

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home appState={appState}/>} /> 
        </Routes>
    </Router>
  );
}