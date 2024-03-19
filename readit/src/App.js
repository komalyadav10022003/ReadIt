import logo from "./logo.svg";
import React from "react";
import { ReactDOM } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import SideBar from "./Components/Sidebar/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
