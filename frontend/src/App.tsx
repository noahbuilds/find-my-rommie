import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile/UserProfile";
import MatchPage from "./pages/MatchPage/MatchPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SupportPage from "./pages/SupportPage/SupportPage";
// import dotenv from 'dotenv';
// dotenv.config();

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div className="App">
      {/* <NavBar user={localStorage.getItem('user')} /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={[<UserProfile />]} />
        <Route path="/about" element={[<AboutPage />]} />
        <Route path="/support" element={[<SupportPage />]} />
        <Route
          path="/match-profile/:id"
          element={[
            <NavBar user={localStorage.getItem("token")} />,
            <MatchPage />,
          ]}
        />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
