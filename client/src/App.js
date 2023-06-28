import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Auth(LandingPage, null)}></Route>
        <Route exact path="/login" Component={Auth(LoginPage, false)}></Route>
        <Route
          exact
          path="/register"
          Component={Auth(RegisterPage, false)}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
