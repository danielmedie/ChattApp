import React from "react";
import "../styling/HomePage.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Lobby from "./Lobby";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<Lobby />} />
      </Routes>
    </Router>
  );
}

export default App;
