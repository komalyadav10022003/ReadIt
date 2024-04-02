import logo from "./logo.svg";
import React from "react";
import { ReactDOM } from "react";
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/StickyNavbar";
import Homepage from "./Components/Homepage/Homepage";
import Home from "./Components/Home/Home";
import CreateBook from "./Components/CreateBook/CreateBook";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve user information from local storage on component mount
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && document.cookie.includes("Login")) {
      setUsername(storedUsername);
    } else {
      setUsername(null);
    }

    // console.log("role="+role);
    // console.log("userId="+userId);
  }, []);

  async function loginHandler(username, password, setToken) {
    await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then((json) => {
        alert(json.username);
        // alert("response", response.text);
        if (!json.error) {
          const user = json.username;
          // Set user ID and role in state and local storage
          setUsername(user);
          localStorage.setItem("username", user);

          // redirect user
          setLoggedIn(true);
          window.location.href = "http://localhost:3000/home";
          // console.log("reached here")

          return {
            username: username,
          };
        } else {
          console.log("Error occured while logging in.");
        }
      });
  }

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              <Homepage loginHandler={loginHandler} username={username} />
            }
          />

          <Route path="/home" element={<Home />} />
          <Route path="/create-book" element={<CreateBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
