import logo from "./logo.svg";
import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import SideBar from "./Components/Sidebar/Sidebar";
import Homepage from "./Components/Homepage/Homepage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {isLoggedIn && <SideBar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
