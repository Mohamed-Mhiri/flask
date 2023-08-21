import './App.css';
import Login from './components/login/login';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HelpPage from './components/help/help';
import React, { useState, useEffect } from "react";
import Signup from './components/signup/signup';
import Verify from './components/signup/verify';
import Home from './components/home/home'
import Info from './components/learn/learn'
import Map from './components/map/map'
import Profile from './components/profile/profile'
import UpdateProfile from './components/profile/updateProfile'
import Password1 from './components/password/forgetpassword'
import PasswordHelp from './components/password/passmail'

function App() {
  // Check if the user is already authenticated in localStorage on initial load
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") === "true");

  // Save the authentication status in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("authenticated", authenticated);
  }, [authenticated]);


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />

            <Route
              path="/form"
              element={authenticated ? <HelpPage /> : <Navigate to="/" />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />
             <Route
              path="/verify"
              element={<Verify />}
            />
             <Route
              path="/password"
              element={<Password1 />}
            />
               <Route
              path="/help"
              element={<PasswordHelp />}
            />
             <Route
              path="/info"
              element={authenticated ? <Info /> : <Navigate to="/" />}
            />
              <Route
              path="/home"
              element={authenticated ? <Home /> : <Navigate to="/" />}
            />
              <Route
              path="/map"
              element={authenticated ? <Map /> : <Navigate to="/" />}
            />
              <Route
              path="/profile"
              element={authenticated ? <Profile /> : <Navigate to="/" />}
            />
               <Route
              path="/Updateprofile"
              element={authenticated ? <UpdateProfile /> : <Navigate to="/" />}
            />
           
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;





